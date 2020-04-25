/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import Select, { components } from 'react-select';
import colors from '../../styles/colors';

import AnnotationCard from './GeneCompoundCard';
import SynonymCard from './SynonymCard';
import VolcanoSelect from './VolcanoSelect';
import 'react-table-6/react-table.css';

// 2 custom hooks to get and process the data
import useFetchAnnotation from './Hooks/useFetchAnnotation';
import useFetchSynonyms from './Hooks/useFetchSynonyms';
import useFetchAnalysisData from './Hooks/useFetchAnalysisData';
import DownloadButton from '../Utils/DownloadButton';
import LoadingComponent from '../Utils/Loading';

const StyledCompoundPage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    .volcanoWrapper {
        margin-top: 80px;
    }
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

const StyledAlert = styled.div`
    color: ${colors.red_highlight};
    font-size: 1em;
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
                height: 40,
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

const CompoundPage = (props) => {
    const { match: { params } } = props;

    // creates an object that contains all filter values
    const [filterValues, setFilterValues] = useState({});
    const [{ filteredData, processedData }, setData] = useState({
        filteredData: [],
        processedData: [],
    });

    // apiData and annotationData are being updated together
    // so they can be handled under the same hook
    const { apiData, annotationData } = useFetchAnnotation(`/api/v1/drugs/${params.id}`, 'drug');

    // get synonyms separately for a separate table
    const { synonymData } = useFetchSynonyms(`/api/v1/drugs/${params.id}/synonyms`);

    // analysisData and loading are handled together => one hook
    const {
        analysisData,
    } = useFetchAnalysisData(`/api/v1/drugs/${params.id}/analysis`);
    const datasetOptions = [...new Set(analysisData.map((item) => item.dataset_name))];

    // for dropdowns
    const [selectedTableData, setSelectedTableData] = useState([]);
    const [state, setState] = useState({
        tableData: {},
        doseOptions: [],
        timeOptions: [],
        selectedDose: '',
        selectedTime: 0,
        loading: true,
    });

    // alert if not available
    const [alert, setAlert] = useState('');

    useEffect(() => {
        if (analysisData.length !== 0) {
            const data = [];
            const tabData = {};
            const doses = [];
            const times = [];
            analysisData.forEach((item) => {
                const newItem = {};
                if (item.gene_name !== '') {
                    Object.entries(item).forEach((val) => {
                        if (typeof val[1] === 'string' && val[0] !== 'gene_name') {
                            newItem[val[0]] = isNaN(parseFloat(val[1]))
                                ? val[1] : parseFloat(val[1]).toExponential(1).toString();
                        } else if (val[0].match(/^(gene_id|gene_name)$/)) {
                            // eslint-disable-next-line prefer-destructuring
                            newItem[val[0]] = val[1];
                        } else {
                            newItem[val[0]] = val[1].toFixed(1).toString();
                        }
                    });

                    // for dropdown options
                    if (!doses.includes(item.dose) && item.dose !== 'Control') {
                        doses.push(item.dose);
                    }
                    if (!times.includes(item.time)) {
                        times.push(item.time);
                    }

                    // check if dose and time key are already in the object
                    const key = `${item.dose}+${item.time}`;
                    if (Object.keys(tabData).includes(key)) {
                        tabData[key].push(item);
                    } else {
                        tabData[key] = [item];
                    }

                    // for csv data
                    data.push(newItem);
                }
            });

            setData({ processedData: data, filteredData: data });

            // for dropdowns
            times.sort((a, b) => a - b);

            /* Dose/time selection */
            const doseOptions = doses.map((x) => ({ value: x, label: x }));
            const timeOptions = times.map((x) => ({ value: x, label: x }));
            setState({
                tableData: tabData,
                doseOptions,
                timeOptions,
                selectedDose: 'High',
                selectedTime: 24,
                loading: false,
            });
            setSelectedTableData(tabData['High+24']);
        }
    }, [analysisData]);

    useEffect(() => {
        const updatedFilteredData = processedData.filter((item) => Object.entries(filterValues)
            .every((val) => item[val[0]].toUpperCase().includes(val[1].toUpperCase())));
        setData({ filteredData: updatedFilteredData, processedData });
    }, [filterValues]);

    // handlers for dropdowns
    const handleDoseChange = (event) => {
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedDose: event.value });
            if (Object.keys(state.tableData).includes(`${event.value}+${state.selectedTime}`)) {
                setAlert('');
                setSelectedTableData(state.tableData[`${event.value}+${state.selectedTime}`]);
            } else {
                setAlert('This dose-time combination is not available.');
            }
        }
    };
    const handleTimeChange = (event) => {
        // no options selected
        if (event === null || event.length === 0) {
            // can't map an empty event, so separate condition here
        } else {
            setState({ ...state, selectedTime: event.value });
            if (Object.keys(state.tableData).includes(`${state.selectedDose}+${event.value}`)) {
                setAlert('');
                setSelectedTableData(state.tableData[`${state.selectedDose}+${event.value}`]);
            } else {
                setAlert('This dose-time combination is not available.');
            }
        }
    };

    const columns = [{
        Header: 'Gene',
        accessor: 'gene_name',
        sortable: true,
        Cell: (row) => (<Link to={`/expression?compoundId=${apiData.id}&geneId=${row.original.gene_id}`}>{row.value}</Link>),
    }, {
        Header: 'log2(fold change)',
        accessor: 'fold_change',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        // Cell: (row) => parseFloat(row.value).toFixed(1),
    }, {
        Header: 'p-value',
        accessor: 'p_value',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        // Cell: (row) => parseFloat(row.value).toExponential(1),
    }, {
        Header: 'FDR',
        accessor: 'fdr',
        sortable: true,
        sortMethod(a, b) { return b - a; },
        // Cell: (row) => parseFloat(row.value).toExponential(1),
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
        { displayName: 'Gene', id: 'gene_name' },
        { displayName: 'log2(fold change)', id: 'fold_change' },
        { displayName: 'p-value', id: 'p_value' },
        { displayName: 'FDR', id: 'fdr' },
        { displayName: 'Dataset', id: 'dataset_name' },
        { displayName: 'Dose', id: 'dose' },
        { displayName: 'Time', id: 'time' },
    ];
    return (
        <StyledCompoundPage>
            {apiData.length === 0 ? null : (
                <div>
                    <h1>{apiData.name}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} type="drug" />
                </div>
            )}
            {synonymData === undefined ? null : (
                <div>
                    <h2>Dataset Names</h2>
                    <SynonymCard data={synonymData} />
                </div>
            )}
            {apiData.length === 0 ? null : (
                <h2>
                    Differential Gene Expression Analysis -
                    {' '}
                    {apiData.name}
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
            <StyledAlert>
                {alert}
            </StyledAlert>
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
                onFilteredChange={(values) => {
                    const filterObj = {};
                    values.forEach((item) => {
                        filterObj[item.id] = item.value;
                    });
                    setFilterValues(filterObj);
                }}
            />
            <DownloadButton
                data={filteredData}
                filename={`${apiData.name}-compoundsData`}
                headers={headers}
            />

            {analysisData.length === 0 ? null : (
                <div className="volcanoWrapper">
                    <VolcanoSelect
                        data={analysisData}
                        queryId={params.id}
                        type="drug"
                    />
                </div>
            )}
        </StyledCompoundPage>
    );
};


export default CompoundPage;
