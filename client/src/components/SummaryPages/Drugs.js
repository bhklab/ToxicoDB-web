import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledDrugs = styled.div`
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

class Drugs extends Component {
    constructor() {
        super();
        this.state = {
            drugData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/drugs')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ drugData: data, loading: false });
            });
    }

    render() {
        const { loading, drugData } = this.state;
        console.log(drugData);
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 200,
                Cell: (row) => (<Link to={`/drugs/${row.original.id}`}>{row.value}</Link>),
            }, {
                Header: 'PubChem ID',
                accessor: 'pubchem',
                sortable: true,
                Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`http://pubchem.ncbi.nlm.nih.gov/compound/${props.value}`}>{props.value}</a>,
            }, {
                Header: 'Carcinogenicity',
                accessor: 'carcinogenicity',
                sortable: true,
            }, {
                Header: 'Class (in vitro)',
                accessor: 'class_in_vitro',
                sortable: true,
            }, {
                Header: 'Class (in vivo)',
                accessor: 'class_in_vivo',
                sortable: true,
            },
            // {
            //     Header: 'Targets',
            //     accessor: 'targets',
            //     sortable: true,
            // },
            // {
            //     Header: 'Class',
            //     accessor: 'class',
            //     sortable: true,
            // },
            // {
            //     Header: 'Class name',
            //     accessor: 'class_name',
            //     sortable: true,
            // },
            // {
            //     Header: 'ATC Code',
            //     accessor: 'atc_code',
            //     sortable: true,
            //     Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.whocc.no/atc_ddd_index/?code=${props.value}`}>{props.value}</a>,
            // },
            {
                Header: 'Smiles',
                accessor: 'smiles',
                sortable: true,
            }, {
                Header: 'InchiKey',
                accessor: 'inchikey',
                sortable: true,
            },
        ];

        return (
            <StyledDrugs>
                <div className="wrapper">
                    <h1>List of drugs</h1>
                    <ReactTable
                        data={drugData}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        columns={columns}
                        className="-highlight"
                        defaultPageSize={25}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </StyledDrugs>
        );
    }
}


export default Drugs;
