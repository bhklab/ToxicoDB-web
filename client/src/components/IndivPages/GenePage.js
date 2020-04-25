/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
// import AnnotationCard from './AnnotationCard';
// import VolcanoPlotly from '../Plots/VolcanoPlotly';
// import VolcanoSingle from '../Plots/VolcanoSingle';

import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Select, { components } from 'react-select';

import colors from '../../styles/colors';
import AnnotationCard from './GeneCompoundCard';
import VolcanoSelect from './VolcanoSelect';
import DownloadButton from '../Utils/DownloadButton';
import LoadingComponent from '../Utils/Loading';

import useFetchAnnotation from './Hooks/useFetchAnnotation';
import useFetchAnalysisData from './Hooks/useFetchAnalysisData';

const StyledGenePage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(2em + 1vw);
        margin:50px 0 40px 0;
    }
    h2 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1.2em + 0.5vw);
        margin: 20px 0;
        font-weight:600;
    }

    a {
      color: ${colors.blue_text};
    }
       
    .table {
        margin:20px 0px 30px 0px;
    }
    .volcanoWrapper {
        margin-top: 100px;
    }
`;

const StyledSelectContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width: 33%;

    .time, .dose {
        width: 45%;
    }
`;

const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    switch (typeof row[id]) {
    case 'object':
        // checks for metastasis label
        if (row[id] && row[id].origin) {
            return String('metastasis').includes(filter.value.toLowerCase());
        }
        // checks for disease name (additional check is to filter out null values)
        return row[id] && row[id].name
            ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
            : false;
        // handles age filtering
    case 'number':
        return row[id].toString().includes(filter.value);
    case 'string':
        return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
    default:
        return false;
    }
};

const normalizeCSVData = (data) => data.map((row) => {
    const csvRow = { ...row };
    if (csvRow.drug_name && csvRow.drug_name.includes(',')) csvRow.drug_name = `"${csvRow.drug_name}"`;
    return csvRow;
});

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

const GenePage = (props) => {
    const { match: { params } } = props;

    // apiData and annotationData are being updated together
    // so they can be handled under the same hook
    // eslint-disable-next-line camelcase
    const { apiData, annotationData } = useFetchAnnotation(`/api/v1/genes/${params.id}`, 'gene');

    // analysisData and loading are handled together => one hook
    const {
        analysisData,
    } = useFetchAnalysisData(`/api/v1/genes/${params.id}/analysis`);

    const [selectedTableData, setSelectedTableData] = useState([]);
    const [state, setState] = useState({
        tableData: {},
        doseOptions: [],
        timeOptions: [],
        selectedDose: '',
        selectedTime: 0,
        loading: true,
    });

    // for dropdowns
    useEffect(() => {
        if (analysisData.length !== 0) {
            const newData = {};
            const doses = [];
            const times = [];
            analysisData.forEach((x) => {
                // for dropdown options
                if (!doses.includes(x.dose) && x.dose !== 'Control') {
                    doses.push(x.dose);
                }
                if (!times.includes(x.time)) {
                    times.push(x.time);
                }

                // check if dose and time key are already in the object
                const key = `${x.dose}+${x.time}`;
                if (Object.keys(newData).includes(key)) {
                    newData[key].push(x);
                } else {
                    newData[key] = [x];
                }
            });
            times.sort((a, b) => a - b);

            /* Dose/time selection */
            const doseOptions = doses.map((x) => ({ value: x, label: x }));
            const timeOptions = times.map((x) => ({ value: x, label: x }));

            setState({
                tableData: newData,
                doseOptions,
                timeOptions,
                selectedDose: 'High',
                selectedTime: 24,
                loading: false,
            });
            setSelectedTableData(newData['High+24']);
        }
    }, [analysisData]);

    // using memoization to prevent csvData recalculation on every render
    const csvData = useMemo(() => normalizeCSVData(analysisData), [analysisData]);


    // changing the headers of the annotation data to include
    if (annotationData.length !== 0) {
        annotationData.forEach((item) => {
            if (item.name === 'name') {
                item.name = 'Ensembl ID';
            }
        });
    }

    // // handlers for dropdowns
    const handleDoseChange = (event) => {
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedDose: event.value });
            setSelectedTableData(state.tableData[`${event.value}+${state.selectedTime}`]);
        }
    };
    const handleTimeChange = (event) => {
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedTime: event.value });
            setSelectedTableData(state.tableData[`${state.selectedDose}+${event.value}`]);
        }
    };

    const datasetOptions = [...new Set(analysisData.map((item) => item.dataset_name))];
    const columns = [{
        Header: 'Compound',
        accessor: 'drug_name',
        sortable: true,
        Cell: (row) => (<Link to={`/expression?compoundId=${row.original.drug_id}&geneId=${params.id}`}>{row.value}</Link>),
    }, {
        Header: 'log2(fold change)',
        accessor: 'fold_change',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        Cell: (row) => parseFloat(row.value).toFixed(1),
    }, {
        Header: 'p-value',
        accessor: 'p_value',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        Cell: (row) => parseFloat(row.value).toExponential(1),
    }, {
        Header: 'FDR',
        accessor: 'fdr',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        Cell: (row) => parseFloat(row.value).toExponential(1),
    }, {
        Header: 'Dataset',
        accessor: 'dataset_name',
        sortable: true,
        filterMethod: (filter, row) => {
            if (filter.value === 'all') {
                return true;
            }
            if (row.dataset_name === filter.value) {
                return true;
            }
            return false;
        },
        Filter: ({ filter, onChange }) => (
            <select
                onChange={(event) => onChange(event.target.value)}
                style={{ width: '100%' }}
                value={filter ? filter.value : 'all'}
            >
                <option value="all">Show All</option>
                {datasetOptions.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ),
    }];
    const headers = [
        { displayName: 'Compound', id: 'drug_name' },
        { displayName: 'log2(fold change)', id: 'fold_change' },
        { displayName: 'p-value', id: 'p_value' },
        { displayName: 'FDR', id: 'fdr' },
        { displayName: 'Dataset', id: 'dataset_name' },
    ];
    return (
        <StyledGenePage>
            {apiData.symbol && (
                <>
                    <h1>{apiData.symbol.toUpperCase()}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} type="gene" />
                </>
            )}

            {apiData.length === 0 ? null : (
                <h2>
                    Compound Response on Gene -
                    {' '}
                    {apiData.symbol}
                </h2>
            )}
            {selectedTableData.length === 0 ? null : (
                <>
                    <StyledSelectContainer>
                        <div className="dose">
                            <h3>Select Dose </h3>
                            <Select
                                defaultValue={{ value: state.selectedDose, label: state.selectedDose }}
                                options={state.doseOptions}
                                components={{ Option: CustomOption }}
                                styles={customStyles}
                                onChange={handleDoseChange}
                            />
                        </div>
                        <div className="time">
                            <h3>Select Time </h3>
                            <Select
                                defaultValue={{ value: state.selectedTime, label: state.selectedTime }}
                                options={state.timeOptions}
                                components={{ Option: CustomOption }}
                                styles={customStyles}
                                onChange={handleTimeChange}
                            />
                        </div>
                    </StyledSelectContainer>
                </>
            )}
            <ReactTable
                data={selectedTableData}
                columns={columns}
                filterable
                defaultFilterMethod={filterCaseInsensitive}
                className="table -highlight"
                defaultPageSize={10}
                defaultSorted={[
                    {
                        id: 'fold_change',
                        desc: true,
                    },
                ]}
                loading={state.loading}
                LoadingComponent={LoadingComponent}
            />


            <DownloadButton
                data={csvData}
                filename={`${apiData.symbol && apiData.symbol.toUpperCase()}-compoundsData`}
                headers={headers}
            />
            {analysisData.length === 0 ? null : (
                <div className="volcanoWrapper">
                    <VolcanoSelect
                        data={analysisData}
                        queryId={params.id}
                        type="gene"
                    />
                </div>
            )}
        </StyledGenePage>
    );
};


export default GenePage;
