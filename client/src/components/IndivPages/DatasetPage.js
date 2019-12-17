import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import { DatasetDescription } from './DatasetDescription';
import colors from '../../styles/colors';
import AnnotationCard from './AnnotationCard';
import DownloadButton from '../Utils/DownloadButton';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledDatasetPage = styled.div`
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

class DatasetPage extends Component {
    constructor() {
        super();
        this.state = {
            datasetName: '',
            datasetData: [],
            annotationData: [],
            analysisData: [],
            loading: true,
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // grabbing the data according to the param id.
        const data = DatasetDescription[params.id];
        console.log(data);
        // annotations
        const annotationData = [];
        let datasetName = '';
        Object.keys(data).forEach((element) => {
            if (!(element === 'DataType' || element === 'Dataset')) {
                const temp = {
                    name: element,
                    value: data[element],
                };
                annotationData.push(temp);
            } else if (element === 'Dataset') {
                datasetName = data[element];
            }
        });
        this.setState({ annotationData, datasetName });

        // analysis table
        fetch(`/api/v1/genes/${params.id}/analysis`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ analysisData: data, loading: false });
            });
    }

    render() {
        const {
            datasetName, datasetData, annotationData, analysisData, loading,
        } = this.state;
        const columns = [{
            Header: 'Drug',
            accessor: 'drug_name',
            sortable: true,
            Cell: (row) => (<Link to={`/expression?drugId=${row.original.drug_id}&geneId=${datasetData.id}`}>{row.value}</Link>),
        }, {
            Header: 'p-value',
            accessor: 'p_value',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(2),
        }, {
            Header: 'Dataset',
            accessor: 'dataset_name',
            sortable: true,
        }];
        const headers = [
            { displayName: 'drug', id: 'drug_name' },
            { displayName: 'p-value', id: 'p_value' },
            { displayName: 'dataset', id: 'dataset_name' },
        ];
        return (
            <StyledDatasetPage>
                {annotationData.length === 0 ? null : (
                    <div>
                        <h1>{datasetName}</h1>
                        <AnnotationCard data={annotationData} />
                    </div>
                )}
                {/* <ReactTable
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
                /> */}
                {/* <DownloadButton
                    data={analysisData}
                    filename={`${datasetData.name}-drugsData`}
                    headers={headers}
                /> */}

            </StyledDatasetPage>
        );
    }
}


export default DatasetPage;
