import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import colors from '../../styles/colors';
import 'react-table-6/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledDatasets = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding: 140px 0px;
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

class Datasets extends Component {
    constructor() {
        super();
        this.state = {
            datasetData: [],
            loading: true,
        };
    }

    componentDidMount() {
        const data = [
            {
                id: 1, name: 'Open TG-GATEs Human', species: 'Human', num_compounds: 146,
            },
            {
                id: 2, name: 'Open TG-GATEs Rat', species: 'R.norvegicus', num_compounds: 140,
            },
            {
                id: 3, name: 'DrugMatrix Rat', species: 'R.norvegicus', num_compounds: 125,
            },
        ];

        this.setState({ datasetData: data, loading: false });
        // fetch('/api/v1/datasets')
        //     .then((response) => response.json())
        //     .then((res) => {
        //         const { data } = res;
        //         console.log(data);
        //         data.forEach((d) => {
        //             if (d.name === 'DrugMatrix Rat') {
        //                 d.name = 'DrugMatrix Rat';
        //             }
        //         });
        //         this.setState({ datasetData: data, loading: false });
        //     });
    }

    render() {
        const { loading, datasetData } = this.state;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 200,
                Cell: (row) => (<Link to={`/datasets/${row.original.id}`}>{row.value}</Link>),
            },
            {
                Header: 'Species',
                accessor: 'species',
                sortable: true,
                minWidth: 200,
            },
            {
                Header: 'Number of Compounds',
                accessor: 'num_compounds',
                sortable: true,
                minWidth: 200,
            },
        ];

        return (
            <StyledDatasets>
                <div className="wrapper">
                    <h1>Datasets</h1>
                    <ReactTable
                        data={datasetData}
                        columns={columns}
                        className="-highlight"
                        showPagination={false}
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
