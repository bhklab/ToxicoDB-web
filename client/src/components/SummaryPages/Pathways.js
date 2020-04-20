/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import colors from '../../styles/colors';
import HeatMap from '../Plots/HeatMap';
import HeatMapLegend from '../Plots/HeatMapLegend';
import HeatMapLegendPathways from '../Plots/HeatMapLegendPathways';
import DefaultPathways from '../Utils/PathwaysList';
import LoadingComponent from '../Utils/Loading';

const StyleContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 90vw;
    justify-content: center;
    
    .div-dataset, .div-drug , .div-ontology, .div-pathway{
        min-width: 18vw;
        margin: 0px 15px 15px 0px;
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
     max-width: 60vw;
     overflow-x: scroll;
     overflow-y: auto;
     margin: auto;
     float: right;
     position: absolute;
     margin-left: 370px;
`;

const StyledEntireHeatmap = styled.div`
    max-width: calc(500px + 60vw);
    width:  ${(props) => `calc(500px + ${props.width}px)`};
    height: 50px;
    .heatmap-legend-pathways {
        float:left;
        width: 370px;
        position:absolute;
        margin-top: 200px;
    }
    .heatmap-legend {
        position:relative;
        margin-top: 214px;
        float:right;
    }};
        
    }
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
    { value: 'Open TG-GATEs Human', label: 'Open TG-GATEs Human' },
    { value: 'Open TG-GATEs Rat', label: 'Open TG-GATEs Rat' },
    { value: 'DrugMatrix Rat', label: 'DrugMatrix Rat' },
];


const ontologyList = [
    { value: 'Reactome', label: 'Reactome' },
    { value: 'GO', label: 'GO' },
];

const Pathways = () => {
    // setting dataset and drug state.
    const [selectedDataset, setDataset] = useState('');
    const [selectedDrugs, setDrugs] = useState([]);
    const [selectedPathways, setPathways] = useState([]);
    const [selectedOntology, setOntology] = useState('');
    const [drugList, setDrugList] = useState([]);
    const [drugGroupData, setDrugGroups] = useState({});
    const [pathwayList, setPathwayList] = useState([]);
    const [parsedPathwayList, setParsedPathwayList] = useState([]);
    const [parsedDataset, setParsedDataset] = useState({});
    const [isGroup, setIsGroup] = useState([]);
    const [isClicked, setButtonState] = useState(false);
    const [isInitialRender, setRender] = useState(false);

    // for setting width of heatmap for the legend margin
    const [width, setWidth] = useState(0);
    const widthCallback = (width) => {
        setWidth(width);
    };

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
        if (parsedData && drugNameList && pathwayNameList) {
            setParsedDataset({
                drugs: finalDrugNameList,
                pathways: pathwayNameList,
                data: parsedData,
                min,
                max,
                mean,
                isGroup,
                dataset: selectedDataset,
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
            if (val.carcinogenicity === 'Carcinogenic') {
                groupDrug.Carcinogenic.push(val.name);
            } else if (val.carcinogenicity === 'Non-Carcinogenic') {
                groupDrug['Non-Carcinogenic'].push(val.name);
            }

            if (val.class_in_vivo === 'Genotoxic') {
                groupDrug.Genotoxic.push(val.name);
            } else if (val.class_in_vivo === 'Non-Genotoxic') {
                groupDrug['Non-Genotoxic'].push(val.name);
            }
        });

        // setting the values for selection.
        let drugs = res.data.map((val) => ({
            value: val.name,
            label: val.name,
        }));

        drugs = [{ value: 'All Drugs', label: 'All Compounds' }, ...drugs];

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
                label: 'Compounds',
                options: drugs,
            },
        ];

        // setting the states.
        setDrugList(drugData);
        setDrugGroups(groupDrug);
    };

    const getStatData = () => {
        if (selectedDrugs && selectedDrugs.length > 0 && selectedDataset && selectedOntology && selectedPathways && selectedPathways.length > 0) {
            const drugs = selectedDrugs.map((val) => val.value);
            const pathways = selectedPathways.map((val) => val.value);
            const ontology = selectedOntology.map((val) => val.value);
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datasetName: selectedDataset, pathways, ontology, drugs,
                }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res));
        }
    };

    // similar to componentDidMount.
    useEffect(() => {
        const pathways = DefaultPathways.Open_TGGATEs_Human;
        if (pathwayList) {
            fetch('/api/v1/pathwaystats/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datasetName: 'Open TG-GATEs Human', pathways, ontology: 'Reactome', drugs: selectedDrugs,
                }),
            })
                .then((response) => response.json())
                .then((res) => parseData(res))
                .then(() => setRender(true));
        }
    }, []);

    // this will be triggerred on the dataset change.
    useEffect(() => {
        if (selectedDataset) {
            fetch('/api/v1/pathway-drugs/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: selectedDataset }),
            })
                .then((response) => response.json())
                .then((res) => createDrugGroups(res));
        }
    }, [selectedDataset]);


    // this will be triggerred on the drugs change.
    useEffect(() => {
        if (selectedDataset && selectedDrugs && selectedDrugs.length > 0) {
            const drugs = selectedDrugs.map((val) => val.value);
            fetch('/api/v1/pathways/dataset/drug', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datasetName: selectedDataset, drugName: drugs }),
            })
                .then((response) => response.json())
                .then((res) => {
                    const pathwayData = res.data.map((val) => ({
                        value: val.name,
                        label: val.name,
                    }));
                    // pathwayData.unshift({ value: 'All Pathways', label: 'All Pathways' });
                    setPathwayList(pathwayData);
                });
        }
    }, [selectedDrugs]);


    // parsing the list to select either Go or Reactome Pathways.
    useEffect(() => {
        if (selectedOntology) {
            const currentOntology = selectedOntology[0].value;
            // const parsedPathwayData = pathwayList.filter((val) => val.value.split('_')[0] === currentOntology.toUpperCase() || val.value === 'All Pathways');
            const parsedPathwayData = pathwayList.filter((val) => val.value.split('_')[0] === currentOntology.toUpperCase());
            // pathways based on drug and dataset.
            setParsedPathwayList(parsedPathwayData);
        }
    }, [selectedOntology]);

    const handleDatasetChange = (selection) => {
        setDrugs(null);
        setOntology(null);
        setPathways(null);
        setDataset(selection.value);
    };

    const handleDrugChange = (selection) => {
        // selected drugs.
        let drugs = [];
        // setting group in order to change the color in heatmap.
        let group = [];
        let isDrugSelected = false;
        if (selection) {
            selection.forEach((row) => {
                if (row.value.match(/Carcinogenic & Non-Carcinogenic/)) {
                    // setting drugs selected.
                    drugs.push(...drugGroupData.Carcinogenic);
                    drugs.push(...drugGroupData['Non-Carcinogenic']);
                    // pushing to group array.
                    // eslint-disable-next-line no-unused-expressions
                    !isDrugSelected && group.push('carcinogenicity');
                } else if (row.value.match(/Genotoxic & Non-Genotoxic/)) {
                    drugs.push(...drugGroupData.Genotoxic);
                    drugs.push(...drugGroupData['Non-Genotoxic']);
                    // eslint-disable-next-line no-unused-expressions
                    !isDrugSelected && group.push('class_in_vivo');
                } else if (row.value === 'All Drugs') {
                    group = [];
                    isDrugSelected = true;
                    drugList[1].options.forEach((val) => {
                        if (val.value !== 'All Drugs') {
                            drugs.push(val.value);
                        }
                    });
                } else {
                    group = [];
                    isDrugSelected = true;
                    drugs.push(row.value);
                }
            });
        }
        setIsGroup(group);
        drugs = [...new Set(drugs)].map((val) => ({ value: val, label: val }));
        setDrugs([...new Set(drugs)]);
    };

    const handleOntologyChange = (selection) => {
        setPathways(null);
        const ontology = [{ value: selection.value, label: selection.label }];
        setOntology(ontology);
    };

    const handlePathwayChange = (selection) => {
        // const list = selection ? selection.map((row) => row.value) : [];
        const pathways = [];
        selection.forEach((val) => {
            // if (val.value === 'All Pathways') {
            //     pathways = parsedPathwayList.filter((val) => val.value !== 'All Pathways');
            // } else {
            //     pathways.push({ value: val.value, label: val.value });
            // }
            pathways.push({ value: val.value, label: val.value });
        });
        setPathways(pathways);
    };

    const handleButtonClickEvent = () => {
        setButtonState(true);
        getStatData();
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
                    {/* {' - '}
                    (
                    {selectedDataset || 'Open TG-GATEs Human'}
                    ) */}
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
                        placeholder="Select the Compound"
                        onChange={handleDrugChange}
                        value={selectedDrugs}
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
                        value={selectedOntology}
                    />
                </div>
                <div className="div-pathway">
                    <Select
                        options={parsedPathwayList}
                        styles={customStyles}
                        placeholder="Select Pathway"
                        onChange={handlePathwayChange}
                        value={selectedPathways}
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
                <StyledEntireHeatmap width={width}>
                    <HeatMapLegendPathways data={parsedDataset} />
                    <StyleHeatmap>
                        <HeatMap
                            data={parsedDataset}
                            widthCallback={widthCallback}
                        />
                    </StyleHeatmap>
                    <HeatMapLegend />
                </StyledEntireHeatmap>
            ) : <LoadingComponent loading />}
        </div>
    );
};


export default Pathways;
