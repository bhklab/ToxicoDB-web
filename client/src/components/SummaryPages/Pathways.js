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


const datasets = [
    { value: 'TGGATES Human LDH', label: 'TGGATES Human LDH' },
    { value: 'TGGATES Rat LDH', label: 'TGGATES Rat LDH' },
    { value: 'drugMatrix', label: 'drugMatrix' },
];


const ontology = [
    { value: 'Reactome', label: 'Reactome' },
    { value: 'GO', label: 'GO' },
];


const Pathways = () => {
    // setting dataset and drug state.
    const [dataset, setDataset] = useState('');
    const [drug, setDrug] = useState([]);

    useEffect(() => {
        if (dataset) {
            fetch('/api/v1/drugs/dataset', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: dataset }),
            })
                .then((response) => response.json())
                .then((res) => {
                    const drugData = res.data.map((val) => ({
                        value: val.name,
                        label: val.name,
                    }));
                    // drugs based on dataset.
                    setDrug(drugData);
                });
        }
    }, [dataset]);

    const handleDatasetChange = (selection) => {
        setDataset(selection.value);
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
                        options={datasets}
                        styles={customStyles}
                        placeholder="Select the Dataset"
                        onChange={handleDatasetChange}
                    />
                </div>
                <div className="div-drug">
                    <Select
                        options={drug}
                        styles={customStyles}
                        placeholder="Select the Drug (eg. Valproic acid)"
                    />
                </div>
                <div className="div-ontology">
                    <Select
                        options={ontology}
                        styles={customStyles}
                        placeholder="Select Ontology"
                    />
                </div>
                <div className="div-pathway">
                    <Select
                        options={ontology}
                        styles={customStyles}
                        placeholder="Select Pathway"
                    />
                </div>
            </StyleContainer>
        </div>
    );
};

export default Pathways;
