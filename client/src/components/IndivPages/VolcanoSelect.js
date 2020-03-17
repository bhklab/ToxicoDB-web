/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, {
    Component, Fragment, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import colors from '../../styles/colors';
import VolcanoSingle from '../Plots/VolcanoSinglePlotly';
import VolcanoLegend from '../Plots/VolcanoLegend';

const StyledVolcanoSelect = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;

    .plot {
        width: 50%;
        flex-grow: 1;
    }
    .hidden { 
        display:none;
    }

`;

const customStyles = {
    control: (provided) => ({
        ...provided,
        background: colors.lightblue_bg,
        borderRadius: '10px',
        marginBottom: '30px',
        // width:300,
        height: 20,
        fontFamily: '\'Raleway\', sans-serif',
        fontWeight: 600,
        color: colors.blue_header,
        marginTop: '80px',
        padding: '0 0px',
        border: `1px solid ${colors.blue_header}`,
        '&:hover': {
            cursor: 'text',
        },
        '&:focus': {
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
        },
    }),
    input: (provided) => ({
        ...provided,
        padding: '0 0px',
        color: colors.blue_header,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        '&:hover': {
            color: `${colors.blue_header}`,
            cursor: 'pointer',
        },
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        '&:hover': {
            color: `${colors.blue_header}`,
            cursor: 'pointer',
        },
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        background: `${colors.blue_header}`,
        '&:hover': {
            background: `${colors.blue_header}`,
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    multiValue: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        background: '#fff',
        marginRight: '10px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    option: (provided, state) => ({
        ...provided,
        textAlign: 'left',
        fontWeight: '400',
        background: 'white',
        color: colors.blue_header,
    }),
};

const CustomOption = (innerProps) => (
    <components.Option {...innerProps}>
        <div
            style={{
                backgroundColor: innerProps.isFocused ? colors.lightblue_bg : 'inherit',
                height: 30,
                padding: '13px 20px',
                '&:hover': {
                    background: colors.lightblue_bg,
                },
            }}
        >
            <span>{innerProps.label}</span>
        </div>
    </components.Option>
);

const customFilterOption = (option, rawInput) => {
    const words = rawInput.split(' ');
    return words.reduce(
        (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
        true,
    );
};


const VolcanoSelect = (props) => {
    const [state, setState] = useState({
        data: [],
        options: [],
        selected: [],
        datasets: [],
        datasetLabels: [],
        loading: null,
    });

    const { data, queryId, type } = props;

    const handleChange = (event) => {
        const selected = [];
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
            setState({ ...state, selected: [] });
        } else {
            event.map((x) => selected.push(x.value));
            setState({ ...state, selected });
        }
    };

    // initial rendering
    useEffect(() => {
        setState({
            ...state,
            data: [],
            options: [],
            selected: [],
            datasets: [],
            datasetLabels: [],
            loading: null,
        });
        // refactoring data to be per dataset for the dataset selector
        const newData = {};
        data.forEach((x) => {
            const dname = x.dataset_name.replace(/ /g, '');
            // if the dataset name isn't a key in newData yet
            if (newData[dname] === undefined) {
                newData[dname] = [];
            }
            newData[dname].push(x);
        });

        const datasets = Object.keys(newData);

        // nicer names for datasets
        const datasetLabels = [];
        datasets.forEach((x) => {
            if (x === 'TGGATEsHuman') datasetLabels.push('TGGATEs Human');
            else if (x === 'TGGATEsRat') datasetLabels.push('TGGATEs Rat');
            else if (x === 'DrugMatrix') datasetLabels.push('DrugMatrix');
            else datasetLabels.push(x);
        });

        // set options
        const options = datasetLabels.map((x, i) => ({ value: datasets[i], label: x }));

        // set selected to the first 1 or 2 datasets
        // const selected = (options.length > 1 ? options.slice(0, 2) : [options[0]]).map((x) => x.value);
        const selected = options.map((x) => x.value);

        // set loading to an object with a pair for each dataset
        const loading = {};
        datasets.forEach((x) => {
            loading[x] = false;
        });

        setState({
            loading, options, data: newData, selected, datasets, datasetLabels,
        });
    }, []);

    return (
        <>
            {state.data.length === 0 && state.options.length === 0 && state.selected.length === 0 ? null : (
                <>
                    <Select
                        isMulti
                        defaultValue={state.options}
                        filterOption={customFilterOption}
                        options={state.options}
                        components={{ Option: CustomOption }}
                        styles={customStyles}
                        onChange={handleChange}
                    />
                    <VolcanoLegend plotId="legend" />
                    <StyledVolcanoSelect>
                        {state.datasets.map((x, i) => (
                            <VolcanoSingle
                                key={i}
                                data={state.data[x]}
                                datasetName={x}
                                queryId={queryId}
                                plotId="volcanoPlot"
                                type={type}
                                selected={state.selected}
                            />
                        ))}

                    </StyledVolcanoSelect>
                </>
            )}
        </>
    );
};

export default VolcanoSelect;
