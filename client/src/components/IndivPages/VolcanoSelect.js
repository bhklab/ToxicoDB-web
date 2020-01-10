/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import VolcanoSingle from '../Plots/VolcanoSingle';
import VolcanoPlotly from '../Plots/VolcanoPlotly';
import Select, { components } from 'react-select';

const StyledVolcanoSelect = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row;
`;

const customStyles = {
    control: (provided) => ({
        ...provided,
        background: colors.search_bg,
        borderRadius: '10px',
        marginBottom:'30px',
        width:300,
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



class VolcanoSelect extends Component {
    constructor() {
        super();
        this.state = {
            fullData: [],
            data: [],
            datasets: [],
            menuOpen: false,
            options: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    handleChange(event) {
        // const { searchData } = this.state;
        // // no options selected (back to none when crossing out values)
        // if (event === null || event.length === 0) {
        //     this.setState({ options: searchData });
        // } else {
        //     // set number of options selected
        //     this.setState({ selected: event });
    
        //     // filter based on the opposite of the selected value's type
        //     if (event.length === 1) {
        //         const newData = [];
        //         searchData.forEach((x, i) => {
        //             if (x.type !== event[0].type) {
        //                 newData.push(x);
        //             }
        //         });
    
        //         this.setState({ options: newData });
        //     } else if (event.length === 2) {
        //         // clear
        //         this.setState({ options: [] });
        //     }
        // }
    }
    
    handleMenuOpen() {
        this.setState({ menuOpen: true });
    }
    
    handleMenuClose() {
        this.setState({ menuOpen: false });
    }

    componentDidMount() {
        const { data } = this.props;

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

        // set the state, show only the first one or two datasets first
        this.setState({ options: options, fullData: data, data: newData, datasets: datasets, });
    }

    render() {
        const { data, datasets, options } = this.state;
        const {type, queryId, } = this.props;
        const {
            handleChange, handleMenuOpen, handleMenuClose,
        } = this;
        return (
            <Fragment>
                {data.length === 0 && datasets.length === 0 && options.length === 0 ? null : (
                    <Fragment>
                        <Select
                            isMulti
                            defaultValue={options.length > 1 ? options.slice(0,2) : [options[0]]}
                            filterOption={customFilterOption}
                            options={options}
                            components={{ Option: CustomOption }}
                            styles={customStyles}
                            onChange={handleChange}
                            onMenuOpen={handleMenuOpen}
                            onMenuClose={handleMenuClose}
                        />
                        <StyledVolcanoSelect>
                            {datasets.map((x,i) => {
                                return <VolcanoSingle //Plotly
                                            key={i}
                                            data={data[x]} // fullData
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
    }
}


export default VolcanoSelect;
