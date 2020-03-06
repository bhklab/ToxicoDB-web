import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: center;
    
    .div-dataset, .div-drug , .div-ontology, .div-pathway {
        min-width: 15vw;
        margin: 0px 15px 15px 15px;
    }
`;

const StyleHeading = styled.div`
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        text-align:center;
        margin-bottom:50px;
    }
    a {
    color: ${colors.blue_text}
    }
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
    const [drug, setDrug] = useState('');
    const [ontology, setOntology] = useState('');
    const [pathwayList, setPathwayList] = useState([]);
    const [parsedDataset, setParsedDataset] = useState({});

    // useEffect(() => {
    //     if (dataset) {
    //         fetch('/api/v1/drugs/dataset', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ id: dataset }),
    //         })
    //             .then((response) => response.json())
    //             .then((res) => {
    //                 const drugData = res.data.map((val) => ({
    //                     value: val.name,
    //                     label: val.name,
    //                 }));
    //                 // drugs based on dataset.
    //                 setDrugList(drugData);
    //             });
    //     }
    // }, [dataset]);

    // useEffect(() => {
    //     if (dataset && drug) {
    //         fetch('/api/v1/pathways/dataset/drug', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ datasetName: dataset, drugName: drug }),
    //         })
    //             .then((response) => response.json())
    //             .then((res) => {
    //                 const pathwayData = res.data.map((val) => ({
    //                     value: val.name,
    //                     label: val.name,
    //                 }));
    //                 // pathways based on drug and dataset.
    //                 setPathwayList(pathwayData);
    //             });
    //     }
    // }, [dataset, drug]);

    const parseData = (response) => {
        const { data } = response;
        let drugName = '';
        const parsedData = {};

        data.forEach((element) => {
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

        // setting the states for pathways, drugs and parsed data.
        const drugNameList = [...Object.keys(parsedData)];
        const pathwayNameList = [...Object.keys(parsedData[drugNameList[0]])];

        // setting the state if we have drug list, pathway list and parsedData.
        if (parseData && drugNameList && pathwayNameList) {
            setParsedDataset({
                drug: drugNameList,
                pathway: pathwayNameList,
                data: parsedData,
            });
        }
    };

    useEffect(() => {
        console.log(parsedDataset);
    }, [parsedDataset]);

    useEffect(() => {
        if (dataset) {
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: dataset }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res));
        }
    }, [dataset]);

    const handleDatasetChange = (selection) => {
        setDataset(selection.value);
    };

    const handleDrugChange = (selection) => {
        setDrug(selection.value);
    };

    const handleOntologyChange = (selection) => {
        setOntology(selection.value);
    };

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
                    />
                </div>
            </StyleContainer>
        </div>
    );
};

export default Pathways;
