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

const StyledSelectContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;

    .datasets {
        width: 70%;
    }
    .time, .dose {
        width: 12%;
    }
`;

const customStyles = {
    // container: (provided) => ({
    //     ...provided,
    //     width: '30%',
    // }),
    control: (provided) => ({
        ...provided,
        background: colors.lightblue_bg,
        borderRadius: '10px',
        marginBottom: '30px',
        // width:300,
        // height: 20,
        fontFamily: '\'Raleway\', sans-serif',
        fontWeight: 600,
        color: colors.blue_header,
        marginTop: '80px',
        padding: '0px 0px',
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
        doseOptions: [],
        timeOptions: [],
        selectedDose: '',
        selectedTime: 0,
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
    const handleDoseChange = (event) => {
        const selected = [];
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedDose: event.value });
        }
    };
    const handleTimeChange = (event) => {
        const selected = [];
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedTime: event.value });
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
            doseOptions: [],
            timeOptions: [],
            selectedDose: '',
            selectedTime: 0,
        });

        // refactoring data to be per dataset for the dataset selector
        // also collecting time points and doses
        const newData = {};
        const doses = [];
        const times = [];
        data.forEach((x) => {
            const dname = x.dataset_name.replace(/ /g, '');
            // if the dataset name isn't a key in newData yet
            if (newData[dname] === undefined) {
                newData[dname] = []; // {}
            }
            newData[dname].push(x);
            // for dropdown options
            if (!doses.includes(x.dose) && x.dose !== 'Control') {
                doses.push(x.dose);
            }
            if (!times.includes(x.time)) {
                times.push(x.time);
            }

            // check if dose and time key are already in the object
            // const key = `${x.dose}${x.time}`;
            // if (Object.keys(newData[dname]).includes(key)) {
            //     newData[dname][key].push(x);
            // } else {
            //     newData[dname][key] = [x];
            // }
        });
        times.sort((a, b) => a - b);

        const datasets = Object.keys(newData);


        /* Dataset selection */
        // nicer names for datasets
        const datasetLabels = [];
        datasets.forEach((x) => {
            if (x === 'OpenTG-GATEsHumanLDH') datasetLabels.push('Open TG-GATEs Human');
            else if (x === 'OpenTG-GATEsRatLDH') datasetLabels.push('Open TG-GATEs Rat');
            else if (x === 'DrugMatrixRat') datasetLabels.push('DrugMatrix Rat');
            else datasetLabels.push(x);
        });

        // set options
        const options = datasetLabels.map((x, i) => ({ value: datasets[i], label: x }));

        // set selected to the first 1 or 2 datasets
        // const selected = (options.length > 1 ? options.slice(0, 2) : [options[0]]).map((x) => x.value);
        const selected = options.map((x) => x.value);

        /* Dose/time selection */
        const doseOptions = doses.map((x) => ({ value: x, label: x }));
        const timeOptions = times.map((x) => ({ value: x, label: x }));

        // set loading to an object with a pair for each dataset
        const loading = {};
        datasets.forEach((x) => {
            loading[x] = false;
        });

        setState({
            loading,
            options,
            data: newData,
            selected,
            datasets,
            datasetLabels,
            doseOptions,
            timeOptions,
            selectedDose: doseOptions[0].value,
            selectedTime: timeOptions[0].value,
        });
    }, []);

    return (
        <>
            {console.log(state.data)}
            {state.data.length === 0 && state.options.length === 0 && state.selected.length === 0 ? null : (
                <>
                    <StyledSelectContainer>
                        <Select
                            className="datasets"
                            isMulti
                            defaultValue={state.options}
                            filterOption={customFilterOption}
                            options={state.options}
                            components={{ Option: CustomOption }}
                            styles={customStyles}
                            onChange={handleChange}
                        />
                        <Select
                            className="dose"
                            defaultValue={state.doseOptions[0]}
                            // filterOption={customFilterOption}
                            options={state.doseOptions}
                            components={{ Option: CustomOption }}
                            styles={customStyles}
                            onChange={handleDoseChange}
                        />
                        <Select
                            className="time"
                            defaultValue={state.timeOptions[0]}
                            // filterOption={customFilterOption}
                            options={state.timeOptions}
                            components={{ Option: CustomOption }}
                            styles={customStyles}
                            onChange={handleTimeChange}
                        />
                    </StyledSelectContainer>
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
                                selectedTime={state.selectedTime}
                                selectedDose={state.selectedDose}
                            />
                        ))}

                    </StyledVolcanoSelect>
                </>
            )}
        </>
    );
};

export default VolcanoSelect;
