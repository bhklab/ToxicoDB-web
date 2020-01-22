/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import colors from '../../styles/colors';
// import AnnotationCard from './AnnotationCard';
import AnnotationCard from './GeneDrugCard';
import VolcanoSelect from './VolcanoSelect';
import 'react-table-6/react-table.css';
// 2 custom hooks to get and process the data
import useFetchAnnotation from './Hooks/useFetchAnnotation';
import useFetchAnalysisData from './Hooks/useFetchAnalysisData';

import DownloadButton from '../Utils/DownloadButton';

import LoadingComponent from '../Utils/Loading';

const StyledDrugPage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    .volcanoWrapper {
        margin-top: 100px;
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
        margin:60px 0px 30px 0px;
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


const DrugPage = (props) => {
    const { match: { params } } = props;

    // creates an object that contains all filter values
    const [filterValues, setFilterValues] = useState({});
    const [{ filteredData, processedData }, setData] = useState({ filteredData: [], processedData: [] });

    // apiData and annotationData are being updated together
    // so they can be handled under the same hook
    const { apiData, annotationData } = useFetchAnnotation(`/api/v1/drugs/${params.id}`, 'drug');
    // analysisData and loading are handled together => one hook
    const {
        analysisData,
        loading,
    } = useFetchAnalysisData(`/api/v1/drugs/${params.id}/analysis`);
    console.log(analysisData);
    const datasetOptions = [...new Set(analysisData.map((item) => item.dataset_name))];

    useEffect(() => {
        console.log(analysisData);
        const data = [...analysisData].map((item) => {
            const newItem = {};
            Object.entries(item).forEach((val) => {
                if (typeof val[1] === 'string') {
                    newItem[val[0]] = isNaN(parseFloat(val[1])) ? val[1] : parseFloat(val[1]).toExponential(1).toString();
                } else if (val[0] === 'gene_id') {
                    // eslint-disable-next-line prefer-destructuring
                    newItem[val[0]] = val[1];
                } else {
                    newItem[val[0]] = val[1].toFixed(1).toString();
                }
            });
            return newItem;
        });

        setData({ processedData: data, filteredData: data });
    }, [analysisData]);

    useEffect(() => {
        const updatedFilteredData = processedData.filter((item) => Object.entries(filterValues)
            .every((val) => item[val[0]].includes(val[1])));
        setData({ filteredData: updatedFilteredData, processedData });
    }, [filterValues]);

    const columns = [{
        Header: 'Gene',
        accessor: 'gene_name',
        sortable: true,
        Cell: (row) => (<Link to={`/expression?drugId=${apiData.id}&geneId=${row.original.gene_id}`}>{row.value}</Link>),
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
        Header: 'fdr',
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
    console.log(processedData);

    const headers = [
        { displayName: 'gene', id: 'gene_name' },
        { displayName: 'p-value', id: 'p_value' },
        { displayName: 'fold-change', id: 'fold_change' },
        { displayName: 'dataset', id: 'dataset_name' },
    ];
    return (
        <StyledDrugPage>
            {apiData.length === 0 ? null : (
                <div>
                    <h1>{apiData.name}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} type="drug" />
                </div>
            )}
            <ReactTable
                data={processedData}
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
                loading={loading}
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
                filename={`${apiData.name}-drugsData`}
                headers={headers}
            />

            {analysisData.length === 0 ? null : (
                <div className="volcanoWrapper">
                    <center>
                        <h2>
                            Analysis -
                            {' '}
                            {apiData.name}
                        </h2>

                    </center>
                    <VolcanoSelect
                        data={analysisData}
                        queryId={params.id}
                        type="drug"
                    />
                </div>
            )}
        </StyledDrugPage>
    );
};


export default DrugPage;
