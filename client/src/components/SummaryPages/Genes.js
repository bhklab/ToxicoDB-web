import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledGenes = styled.div`
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

class Genes extends Component {
    constructor() {
        super();
        this.state = {
            geneData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/genes')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ geneData: data, loading: false });
            });
    }

    render() {
        const { loading, geneData } = this.state;
        const columns = [{
            Header: 'Name',
            accessor: 'name',
            sortable: true,
            Cell: (row) => (<Link to={`/genes/${row.original.id}`}>{row.value}</Link>),
        }, {
            Header: 'Ensembl ID',
            accessor: 'ensembl_gid',
            sortable: true,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${props.value}`}>{props.value}</a>,
        }, {
            Header: 'Entrez ID',
            accessor: 'entrez_gid',
            sortable: true,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/gene/?term=${props.value}`}>{props.value}</a>,
        }];

        return (
            <StyledGenes>
                <div className="wrapper">
                    <h1>List of Genes</h1>
                    <ReactTable
                        data={geneData}
                        columns={columns}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        className="-highlight"
                        defaultPageSize={25}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </StyledGenes>
        );
    }
}


export default Genes;
