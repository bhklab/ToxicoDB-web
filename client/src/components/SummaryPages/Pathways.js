import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyleContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    .div-dataset, .div-drug , .div-ontology {
        min-width: 350px;
        margin: 20px;
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

const drugs = [
    { value: 'TGGATES Human LDH', label: 'TGGATES Human LDH' },
    { value: 'TGGATES Rat LDH', label: 'TGGATES Rat LDH' },
    { value: 'drugMatrix', label: 'drugMatrix' },
];

const Pathways = () => (
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
                />
            </div>
            <div className="div-drug">
                <Select
                    options={drugs}
                    styles={customStyles}
                    placeholder="Select the Drug"
                />
            </div>
            <div className="div-ontology">
                <Select
                    options={ontology}
                    styles={customStyles}
                    placeholder="Select Ontology"
                />
            </div>
        </StyleContainer>
    </div>
);

export default Pathways;
