import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledDatasets = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        text-align:center;
        margin-bottom:50px;
    }
    a {
      color: ${colors.blue_text}
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

class Datasets extends Component {
    constructor() {
        super();
        this.state = {
            datasetData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/datasets')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ datasetData: data, loading: false });
            });
    }

    render() {
        const { loading, datasetData } = this.state;
        console.log(datasetData);
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 200,
            },
        ];

        return (
            <StyledDatasets>
                <div className="wrapper">
                    <h1>List of Datasets</h1>
                    <ReactTable
                        data={datasetData}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        columns={columns}
                        className="-highlight"
                        defaultPageSize={3}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </StyledDatasets>
        );
    }
}


export default Datasets;
