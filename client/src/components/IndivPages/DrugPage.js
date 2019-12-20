import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import AnnotationCard from './AnnotationCard';
import Volcano from '../Plots/Volcano';
import VolcanoPlotly from '../Plots/VolcanoPlotly';
import 'react-table/react-table.css';

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

class DrugPage extends Component {
    constructor() {
        super();
        this.state = {
            drugData: [],
            annotationData: [],
            volcanoData: [],
            analysisData: [],
            loading: true,
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // annotations
        fetch(`/api/v1/drugs/${params.id}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const annotationData = [];
                Object.keys(data[0]).forEach((x, i) => {
                    if (x !== 'name' && x !== 'id') {
                        const temp = {
                            name: x,
                            value: data[0][x],
                        };
                        annotationData.push(temp);
                    }
                });
                this.setState({ drugData: data[0], annotationData });
            });

        // // volcano plot
        // fetch(`/api/v1/analysis?drugId=${params.id}`)
        //     .then((response) => response.json())
        //     .then((res) => {
        //         const {data} = res;
        //         this.setState({volcanoData: data})
        //     })

        // analysis table
        fetch(`/api/v1/drugs/${params.id}/analysis`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const filteredData = data.filter((item) => parseFloat(item.p_value) !== 0);
                this.setState({ analysisData: filteredData, volcanoData: filteredData, loading: false });
            });
    }

    render() {
        const {
            drugData, annotationData, volcanoData, analysisData, loading,
        } = this.state;
        const { match: { params } } = this.props;
        const columns = [{
            Header: 'Gene',
            accessor: 'gene_name',
            sortable: true,
            Cell: (row) => (<Link to={`/expression?drugId=${drugData.id}&geneId=${row.original.gene_id}`}>{row.value}</Link>),
        }, {
            Header: 'p-value',
            accessor: 'p_value',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(3),
        }, {
            Header: 'fold-change',
            accessor: 'fold_change',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(2),
        }, {
            Header: 'fdr',
            accessor: 'fdr',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(2),
        },{
            Header: 'Dataset',
            accessor: 'dataset_name',
            sortable: true,
        }];

        const headers = [
            { displayName: 'gene', id: 'gene_name' },
            { displayName: 'p-value', id: 'p_value' },
            { displayName: 'fold-change', id: 'fold_change' },
            { displayName: 'dataset', id: 'dataset_name' },
        ];
        return (
            <StyledDrugPage>
                {drugData.length === 0 ? null : (
                    <div>
                        <h1>{drugData.name}</h1>
                        <h2>Annotations</h2>
                        <AnnotationCard data={annotationData} />
                    </div>
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
                            id: 'p_value',
                            desc: true,
                        },
                    ]}
                    loading={loading}
                    LoadingComponent={LoadingComponent}
                />
                <DownloadButton
                    data={analysisData}
                    filename={`${drugData.name}-drugsData`}
                    headers={headers}
                />
                {volcanoData.length === 0 ? null : (
                    <div className="volcanoWrapper">
                        <center>
                            <h2>
                            Analysis -
                                {' '}
                                {drugData.name}
                            </h2>
                        </center>
                        <VolcanoPlotly
                            data={volcanoData}
                            queryId={params.id}
                            plotId="volcanoPlot"
                            type="drug"
                        />
                        {/* <Volcano
                            data={volcanoData}
                            queryId={params.id}
                            plotId="volcanoPlot"
                            type="drug"
                        /> */}
                    </div>
                )}
            </StyledDrugPage>
        );
    }
}


export default DrugPage;
