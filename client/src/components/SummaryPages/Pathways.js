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
        font-size:  ${(props) => props.theme['font-size']};;
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


const StyleButton = styled.button`
    background-color: ${colors.blue_text};
    border: none;
    border-radius: 6px;
    color: #ffffff;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    font-family: 'Raleway', sans-serif;
    font-weight:700;
    margin: auto;
    transition: .3s;
    outline-style: none;
    margin-top: 0px;
    margin-left: 10px;
    &:hover {
        opacity: 1;
        cursor: pointer;
        color: ${colors.blue_text};
        background-color: #ffffff;
        border: 1px solid ${colors.blue_text};
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
    const [drugs, setDrugs] = useState([]);
    const [pathways, setPathways] = useState([]);
    const [ontology, setOntology] = useState('Reactome');
    const [pathwayList, setPathwayList] = useState(DefaultPathways.TGGATES_Human);
    const [drugList, setDrugList] = useState([]);
    const [drugGroupData, setDrugGroups] = useState({});
    const [parsedDataset, setParsedDataset] = useState({});
    const [statData, setStatData] = useState({});
    const [isGroup, setIsGroup] = useState([]);
    const [isClicked, setButtonState] = useState(false);
    const [isInitialRender, setRender] = useState(false);


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
        let drugs = res.data.map((val) => ({
            value: val.name,
            label: val.name,
        }));

        drugs = [{ value: 'All Drugs', label: 'All Drugs' }, ...drugs];

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
                .then((res) => parseData(res))
                .then(() => setRender(true));
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
                .then((res) => setStatData(res));
        }
    }, [drugs, pathways, dataset]);


    const handleDatasetChange = (selection) => {
        setDataset(selection.value);
    };

    const handleDrugChange = (selection) => {
        // selected drugs.
        const drugs = [];
        // setting group in order to change the color in heatmap.
        const group = [];
        if (selection) {
            selection.forEach((row) => {
                if (row.value.match(/Carcinogenic & Non-Carcinogenic/)) {
                    drugs.push(...drugGroupData.Carcinogenic);
                    drugs.push(...drugGroupData['Non-Carcinogenic']);
                    group.push('carcinogenicity');
                } else if (row.value.match(/Genotoxic & Non-Genotoxic/)) {
                    drugs.push(...drugGroupData.Genotoxic);
                    drugs.push(...drugGroupData['Non-Genotoxic']);
                    group.push('class_in_vivo');
                } else {
                    drugs.push(row.value);
                }
            });
        }
        setIsGroup(group);
        setDrugs([...new Set(drugs)]);
    };

    const handleOntologyChange = (selection) => {
        setOntology(selection.value);
    };

    const handlePathwayChange = (selection) => {
        const list = selection ? selection.map((row) => row.value) : [];
        setPathways(list);
    };

    const handleButtonClickEvent = () => {
        parseData(statData);
        setButtonState(true);
    };

    const isObjectEmpty = (data) => (Object.entries(data).length === 0 && data.constructor === Object);

    return (
        <div>
            <StyleHeading theme={{
                bottom: '100px', top: '200px', color: `${colors.red_highlight}`, 'font-size': 'calc(1em + 1vw)',
            }}
            >
                <h1>
                    Pathways
                    {' - '}
                    (
                    {dataset}
                    )
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
                <div>
                    <StyleButton onClick={handleButtonClickEvent}>
                        Search
                    </StyleButton>
                </div>
            </StyleContainer>
            { ((isClicked && !isInitialRender) || (isInitialRender && !isObjectEmpty(parsedDataset))) ? (
                <StyleHeatmap>
                    <HeatMap data={parsedDataset} />
                </StyleHeatmap>
            ) : null}
        </div>
    );
};


export default Pathways;
