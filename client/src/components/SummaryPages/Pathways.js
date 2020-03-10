import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import colors from '../../styles/colors';
import HeatMap from '../Plots/HeatMap';
import DefaultPathways from '../Utils/PathwaysList';

const StyleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 90vw;
    justify-content: center;
    
    .div-dataset, .div-drug , .div-ontology, .div-pathway{
        min-width: 18vw;
        margin: 0px 15px 15px 15px;
        max-width: 19vw;
    }
`;

const StyleHeading = styled.div`
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        text-align:center;
        margin-bottom:50px;
        margin-top: 140px;
    }
    a {
    color: ${colors.blue_text}
    }
`;

const StyleHeatmap = styled.div`
     width: 90vw;
     overflow-x: scroll;
     overflow-y: scroll;
`;

const customStyles = {
    placeholder: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        fontWeight: '400',
        fontSize: '15px',
    }),

    control: (provided) => ({
        ...provided,
        '&:hover': { borderColor: `${colors.blue_text}` },
        border: '1px solid #0c699e',
        boxShadow: 'none',
        padding: '0px 5px',
        borderRadius: '5px',
        background: 'rgb(255,255,255,0.7)',
    }),

    indicatorSeparator: (provided) => ({
        ...provided,
        background: `${colors.blue_text}`,
        '&:hover': { background: `${colors.blue_text}` },
        height: '30px',
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        '&:hover': {
            color: `${colors.blue_text}`,
            cursor: 'pointer',
        },
    }),

    option: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        background: '#ffffff',
        margin: '0px 0px',
        '&:hover': {
            background: `${colors.lightred_bg}`,
        },
        fontSize: '14px',
        textAlign: 'left',
    }),

    singleValue: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        fontSize: '15px',
    }),

    multiValue: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        fontSize: '15px',
    }),

    input: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
    }),

    clearIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_text}`,
        '&:hover': {
            color: `${colors.blue_text}`,
        },
    }),

    valueContainer: (provided) => ({
        ...provided,
        minHeight: '10px',
        height: '40px',
        paddingTop: '0',
        paddingBottom: '0',
        overflow: 'auto',
    }),
};


const datasetList = [
    { value: 'TGGATES Human LDH', label: 'TGGATES Human LDH' },
    { value: 'TGGATES Rat LDH', label: 'TGGATES Rat LDH' },
    { value: 'drugMatrix', label: 'drugMatrix' },
];


const ontologyList = [
    { value: 'Reactome', label: 'Reactome' },
    { value: 'GO', label: 'GO' },
];


const Pathways = () => {
    // setting dataset and drug state.
    const [dataset, setDataset] = useState('');
    const [drugList, setDrugList] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [ontology, setOntology] = useState('');
    const [pathwayList, setPathwayList] = useState(DefaultPathways.TGGATES_Human);
    const [pathways, setPathways] = useState([]);
    const [parsedDataset, setParsedDataset] = useState({});

    const parseData = (response) => {
        const { data } = response;
        let drugName = '';
        const parsedData = {};
        let min = 0;
        let max = 0;
        let totalMax = 0;
        let total = 0;
        let mean = 0;

        data.forEach((element) => {
            if (element.stat_dis > 0) {
                totalMax += element.stat_dis;
                total += 1;
            }
            if (element.stat_dis > max) { max = element.stat_dis; }
            if (element.stat_dis < min) { min = element.stat_dis; }
            if (element.drug !== drugName) {
                drugName = element.drug;
                parsedData[element.drug] = {};
            } else if (element.drug === drugName) {
                parsedData[element.drug][element.pathway] = {};
                parsedData[element.drug][element.pathway].fdr = element.fdr;
                parsedData[element.drug][element.pathway].p_value = element.p_value;
                parsedData[element.drug][element.pathway].stat_dis = element.stat_dis;
            }
        });

        mean = totalMax / total;


        // setting the states for pathways, drugs and parsed data.
        const drugNameList = [...Object.keys(parsedData)];
        const pathwayNameList = [...Object.keys(parsedData[drugNameList[0]])];

        // setting the state if we have drug list, pathway list and parsedData.
        if (parseData && drugNameList && pathwayNameList) {
            setParsedDataset({
                drugs: drugNameList,
                pathways: pathwayNameList,
                data: parsedData,
                min,
                max,
                mean,
            });
        }
    };

    useEffect(() => {
        if (pathwayList) {
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: 'TGGATES Human LDH', pathways: pathwayList }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res));
        }
    }, []);

    useEffect(() => {
        if (dataset) {
            fetch('/api/v1/pathway-drugs/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: dataset }),
            })
                .then((response) => response.json())
                .then((res) => {
                    const drugData = res.data.map((val) => ({
                        value: val.name,
                        label: val.name,
                    }));
                        // drugs based on dataset.
                    setDrugList(drugData);
                });
        }
    }, [dataset]);

    useEffect(() => {
        if (dataset && drugs.length > 0) {
            fetch('/api/v1/pathways/dataset/drug', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: dataset, drugName: drugs }),
            })
                .then((response) => response.json())
                .then((res) => {
                    const pathwayData = res.data.map((val) => ({
                        value: val.name,
                        label: val.name,
                    }));
                    // pathways based on drug and dataset.
                    setPathwayList(pathwayData);
                });
        }
    }, [dataset, drugs]);

    const handleDatasetChange = (selection) => {
        setDataset(selection.value);
    };

    const handleDrugChange = (selection) => {
        const list = selection.map((row) => row.value);
        setDrugs(list);
    };

    const handleOntologyChange = (selection) => {
        setOntology(selection.value);
    };

    const handlePathwayChange = (selection) => {
        const list = selection.map((row) => row.value);
        setPathways(list);
    };

    const isObjectEmpty = (data) => Object.entries(data).length === 0 && data.constructor === Object;

    return (
        <div>
            <StyleHeading>
                <h1>
                Pathways
                </h1>
            </StyleHeading>
            <StyleContainer>
                <div className="div-dataset">
                    <Select
                        options={datasetList}
                        styles={customStyles}
                        placeholder="Select the Dataset"
                        onChange={handleDatasetChange}
                    />
                </div>
                <div className="div-drug">
                    <Select
                        options={drugList}
                        styles={customStyles}
                        placeholder="Select the Drug (eg. Valproic acid)"
                        onChange={handleDrugChange}
                        isMulti
                        isSearchable
                        isClearable
                    />
                </div>
                <div className="div-ontology">
                    <Select
                        options={ontologyList}
                        styles={customStyles}
                        placeholder="Select Ontology"
                        onChange={handleOntologyChange}
                    />
                </div>
                <div className="div-pathway">
                    <Select
                        options={pathwayList}
                        styles={customStyles}
                        placeholder="Select Pathway"
                        onChange={handlePathwayChange}
                        isMulti
                        isSearchable
                        isClearable
                    />
                </div>
            </StyleContainer>
            { isObjectEmpty(parsedDataset) ? null : (
                <StyleHeatmap>
                    <HeatMap data={parsedDataset} />
                </StyleHeatmap>
            )}
        </div>
    );
};

export default Pathways;
