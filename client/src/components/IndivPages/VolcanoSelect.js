/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { Component, Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import VolcanoSingle from '../Plots/VolcanoSingle';
import VolcanoLegend from '../Plots/VolcanoLegend';
import Select, { components } from 'react-select';
import { timingSafeEqual } from 'crypto';

const StyledVolcanoSelect = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;

    .plot {
        width: 50%;
        flex-grow: 1;
    }

`;

const customStyles = {
    control: (provided) => ({
        ...provided,
        background: colors.search_bg,
        borderRadius: '10px',
        marginBottom:'30px',
        // width:300,
        height: 20,
        fontFamily: '\'Raleway\', sans-serif',
        fontWeight: 600,
        color: colors.search_main,
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
        color: colors.search_main,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
        '&:hover': {
            color: `${colors.search_main}`,
            cursor: 'pointer',
        },
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
        '&:hover': {
            color: `${colors.search_main}`,
            cursor: 'pointer',
        },
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        background: `${colors.search_main}`,
        '&:hover': {
            background: `${colors.search_main}`,
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
    }),
    multiValue: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
        background: '#fff',
        marginRight: '10px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: `${colors.search_main}`,
    }),
    option: (provided, state) => ({
        ...provided,
        textAlign: 'left',
        fontWeight: '400',
        background: 'white',
        color: colors.search_main,
    }),
};

const CustomOption = (innerProps) => (
    <components.Option {...innerProps}>
        <div
            style={{
                backgroundColor: innerProps.isFocused ? colors.search_bg : 'inherit',
                height: 30,
                padding: '13px 20px',
                '&:hover': {
                    background: colors.search_bg,
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
    });

    const { data, queryId, type } = props;
    
    const handleChange = (event) => {
        let selected = [];
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
            setState({...state, selected: []})
        } else {
            event.map((x) => selected.push(x.value));
            setState({...state, selected: selected});
        }
        
    }

    // initial rendering
    useEffect(() => {
        setState({...state, 
            data: [],
            options: [],
            selected: [],
        });
        // refactoring data to be per dataset for the dataset selector
        let newData = {};
        data.forEach((x) => {
            const dname = x.dataset_name.replaceAll(' ', '');
            // if the dataset name isn't a key in newData yet
            if (newData[dname] === undefined) {
                newData[dname] = [];
            } 
            newData[dname].push(x);
        })

        const datasets = Object.keys(newData);

        // set options
        const options = datasets.map((x) => {return {'value': x, 'label': x}});

        // set selected to the first 1 or 2 datasets
        const selected = (options.length > 1 ? options.slice(0,2) : [options[0]]).map((x) => x.value);

        setState({options: options, data: newData, selected: selected});
    }, []);

    return (
        <Fragment>
            {state.data.length === 0 && state.options.length === 0 && state.selected.length === 0 ? null : (
                <Fragment>
                    <Select
                        isMulti
                        defaultValue={state.options.length > 1 ? state.options.slice(0,2) : [state.options[0]]}
                        filterOption={customFilterOption}
                        options={state.options}
                        components={{ Option: CustomOption }}
                        styles={customStyles}
                        onChange={handleChange}
                    />
                    <VolcanoLegend plotId="legend"/>
                    <StyledVolcanoSelect>
                        {console.log('selected', state.selected)}
                        {state.selected.map((x,i) => {
                            return <VolcanoSingle 
                                        key={i}
                                        data={state.data[x]} 
                                        datasetName={x}
                                        queryId={queryId}
                                        plotId="volcanoPlot"
                                        type={type}
                                    />
                        })}
                    </StyledVolcanoSelect>
                </Fragment>
                
            )}
        </Fragment>
    );   
};

export default VolcanoSelect;
