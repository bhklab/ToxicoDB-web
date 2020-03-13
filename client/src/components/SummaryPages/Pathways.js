/* eslint-disable no-shadow */
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
        max-width: 20vw;
    }
`;

const StyleHeading = styled.div`
    h1 {
        color: ${(props) => props.theme.color};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        text-align:center;
        margin-bottom: ${(props) => props.theme.bottom};
        margin-top: ${(props) => props.theme.top};
    }
    a {
    color: ${colors.blue_text}
    }
`;

const StyleHeatmap = styled.div`
     width: 80vw;
     overflow-x: scroll;
     overflow-y: scroll;
     margin: auto;
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


// https://codesandbox.io/s/react-codesandboxer-example-tq9f2
const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: `${colors.red_highlight}`,
    fontSize: 14,
    borderBottom: `1px solid ${colors.red_highlight}`,
    padding: '4px',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: `${colors.red_highlight}`,
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.2em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const datasetList = [
    { value: 'TGGATES Human', label: 'TGGATES Human' },
    { value: 'TGGATES Rat', label: 'TGGATES Rat' },
    { value: 'drugMatrix', label: 'drugMatrix' },
];


const ontologyList = [
    { value: 'Reactome', label: 'Reactome' },
    { value: 'GO', label: 'GO' },
];


const Pathways = () => {
    // setting dataset and drug state.
    const [dataset, setDataset] = useState('TGGATES Human');
    const [drugList, setDrugList] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [ontology, setOntology] = useState('Reactome');
    const [pathwayList, setPathwayList] = useState(DefaultPathways.TGGATES_Human);
    const [pathways, setPathways] = useState([]);
    const [parsedDataset, setParsedDataset] = useState({});
    const [drugGroup, setDrugGroups] = useState({});
    const [isGroup, setIsGroup] = useState([]);


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
            }
            parsedData[element.drug][element.pathway] = {};
            parsedData[element.drug][element.pathway].fdr = element.fdr;
            parsedData[element.drug][element.pathway].p_value = element.p_value;
            parsedData[element.drug][element.pathway].stat_dis = element.stat_dis;
            parsedData[element.drug][element.pathway].carcinogenicity = element.carcinogenicity;
            parsedData[element.drug][element.pathway].class_in_vivo = element.class_in_vivo;
        });

        mean = totalMax / total;

        // setting the states for pathways, drugs and parsed data.
        const finalDrugNameList = {};
        const drugNameList = [...Object.keys(parsedData)];
        const pathwayNameList = [...Object.keys(parsedData[drugNameList[0]])];
        drugNameList.forEach((val) => {
            finalDrugNameList[val] = {};
            finalDrugNameList[val].carcinogenicity = parsedData[val][pathwayNameList[0]].carcinogenicity;
            finalDrugNameList[val].class_in_vivo = parsedData[val][pathwayNameList[0]].class_in_vivo;
        });

        // setting the state if we have drug list, pathway list and parsedData.
        if (parsedDataset && drugNameList && pathwayNameList) {
            setParsedDataset({
                drugs: finalDrugNameList,
                pathways: pathwayNameList,
                data: parsedData,
                min,
                max,
                mean,
                isGroup,
                dataset,
            });
        }
    };

    const createDrugGroups = (res) => {
        // the grouping of drugs and setting the drugs for each type.
        const groupDrug = {
            Carcinogenic: [],
            'Non-Carcinogenic': [],
            Genotoxic: [],
            'Non-Genotoxic': [],
        };
        res.data.forEach((val) => {
            if (val.carcinogenicity === 'C') {
                groupDrug.Carcinogenic.push(val.name);
            } else if (val.carcinogenicity === 'NC') {
                groupDrug['Non-Carcinogenic'].push(val.name);
            }

            if (val.class_in_vivo === 'GTX') {
                groupDrug.Genotoxic.push(val.name);
            } else if (val.class_in_vivo === 'NGTX') {
                groupDrug['Non-Genotoxic'].push(val.name);
            }
        });

        // setting the values for selection.
        const drugs = res.data.map((val) => ({
            value: val.name,
            label: val.name,
        }));

        const groups = ['Carcinogenic & Non-Carcinogenic', 'Genotoxic & Non-Genotoxic'].map((val) => ({
            value: val,
            label: val,
        }));

        const drugData = [
            {
                label: 'Groups',
                options: groups,
            },
            {
                label: 'Drugs',
                options: drugs,
            },
        ];

        // setting the states.
        setDrugList(drugData);
        setDrugGroups(groupDrug);
    };

    // similar to componentDidMount.
    useEffect(() => {
        if (pathwayList) {
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datasetName: 'TGGATES Human', pathways: pathwayList, ontology, drugs,
                }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res));
        }
    }, []);

    // this will be triggerred on the dataset change.
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
                .then((res) => createDrugGroups(res));
        }
    }, [dataset]);


    // this will be triggerred on the drugs change.
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
    }, [drugs]);


    // this will be triggerred on the pathways change.
    useEffect(() => {
        if (drugs.length > 0 && dataset && ontology && pathways.length > 0) {
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datasetName: 'TGGATES Human', pathways, ontology, drugs,
                }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res));
        }
    }, [pathways]);


    const handleDatasetChange = (selection) => {
        setDataset(selection.value);
    };

    const handleDrugChange = (selection) => {
        const list = selection ? selection.map((row) => row.value) : [];
        // setting group in order to change the color in heatmap.
        const group = [];
        list.forEach((val) => {
            if (val.match(/Carcinogenic & Non-Carcinogenic/)) {
                group.push('carcinogenicity');
            } else if (val.match(/Genotoxic & Non-Genotoxic/)) {
                group.push('class_in_vivo');
            }
        });
        setIsGroup(group);
        if (list.length > 0 && list[0].match(/(Carcinogenic & Non-Carcinogenic|Genotoxic & Non-Genotoxic)/)) {
            // list of drugs based on grouping.
            const drugs = [];
            const selectedList = [];
            list.forEach((val) => selectedList.push(...val.split('&')));
            selectedList.forEach((val) => drugs.push(...drugGroup[val.replace(' ', '')]));
            // setting only the unique values.
            setDrugs([...new Set(drugs)]);
        } else {
            setDrugs(list);
        }
    };

    const handleOntologyChange = (selection) => {
        setOntology(selection.value);
    };

    const handlePathwayChange = (selection) => {
        const list = selection ? selection.map((row) => row.value) : [];
        setPathways(list);
    };

    // const isObjectEmpty = (data) => Object.entries(data).length === 0 && data.constructor === Object;
    const isObjectEmpty = (data) => (Object.entries(data).length === 0 && data.constructor === Object);

    return (
        <div>
            <StyleHeading theme={{ bottom: '100px', top: '200px', color: `${colors.red_highlight}` }}>
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
                        formatGroupLabel={formatGroupLabel}
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
                <>
                    <StyleHeading theme={{ bottom: '10px', top: '100px', color: `${colors.blue_header}` }}>
                        <h1>
                            {dataset}
                        </h1>
                    </StyleHeading>
                    <StyleHeatmap>
                        <HeatMap data={parsedDataset} />
                    </StyleHeatmap>
                </>
            )}
        </div>
    );
};


export default Pathways;
