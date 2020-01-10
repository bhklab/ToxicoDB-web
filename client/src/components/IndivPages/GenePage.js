/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import colors from '../../styles/colors';
import AnnotationCard from './AnnotationCard';
// import VolcanoPlotly from '../Plots/VolcanoPlotly';
// import VolcanoSingle from '../Plots/VolcanoSingle';
import VolcanoSelect from './VolcanoSelect';
import DownloadButton from '../Utils/DownloadButton';
import 'react-table-6/react-table.css';
// 2 custom hooks to get and process the data
import useFetchAnnotation from './Hooks/useFetchAnnotation';
import useFetchAnalysisData from './Hooks/useFetchAnalysisData';

import LoadingComponent from '../Utils/Loading';

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
        margin:60px 0px 30px 0px;
    }
    .volcanoWrapper {
        margin-top: 100px;
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

const GenePage = (props) => {
    const { match: { params } } = props;
    // apiData and annotationData are being updated together
    // so they can be handled under the same hook
    const { apiData, annotationData } = useFetchAnnotation(`/api/v1/genes/${params.id}`, 'gene');
    // analysisData and loading are handled together => one hook
    const { analysisData, loading } = useFetchAnalysisData(`/api/v1/genes/${params.id}/analysis`);

    const datasetOptions = [...new Set(analysisData.map((item) => item.dataset_name))];
    const columns = [{
        Header: 'Drug',
        accessor: 'drug_name',
        sortable: true,
        Cell: (row) => (<Link to={`/expression?drugId=${row.original.drug_id}&geneId=${apiData.id}`}>{row.value}</Link>),
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
        Header: 'fdr',
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
        { displayName: 'drug', id: 'drug_name' },
        { displayName: 'p-value', id: 'p_value' },
        { displayName: 'fold-change', id: 'fold_change' },
        { displayName: 'dataset', id: 'dataset_name' },
    ];
    return (
        <StyledGenePage>
            {apiData.length === 0 ? null : (
                <>
                    <h1>{apiData.symbol}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} />
                </>
            )}
            <ReactTable
                data={analysisData}
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
            />
            <DownloadButton
                data={analysisData}
                filename={`${apiData.name}-drugsData`}
                headers={headers}
            />

            {/* {analysisData.length === 0 ? null : (
                    <div className="volcanoWrapper">
                        <center>
                            <h2>
                            Analysis -
                                {' '}
                                {geneData.symbol}
                            </h2>

                        </center>
                        <Volcano
                            data={analysisData}
                            queryId={params.id}
                            plotId="volcanoPlot"
                            type="gene"
                        />
                        <VolcanoPlotly
                            data={analysisData}
                            queryId={params.id}
                            plotId="volcanoPlot"
                            type="gene"
                        />
                    </div>
                )} */}
            {analysisData.length === 0 ? null : (
                <div className="volcanoWrapper">
                    <center>
                        <h2>
                            Analysis -
                            {' '}
                            {apiData.symbol}
                        </h2>

                    </center>
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
