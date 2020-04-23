import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import colors from '../../styles/colors';
import 'react-table-6/react-table.css';
import transitions from '../../styles/transitions';

import LoadingComponent from '../Utils/Loading';
import downloadIcon from '../../images/download.svg';

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

    button {
        margin-left: 10px;
        color: #fff !important;
        background: ${colors.blue_header};
        
        padding: 8px;
        border: 0;
        font-size: 13px;
        transition: ${transitions.main_trans}
        img {
            display: inline-block;
            height: 13px;
            width: auto;
        }
        &:hover {
            background-color: ${colors.pagination_dark};
        }
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
                id: 1, name: 'Open TG-GATEs Human', species: 'Human', num_compounds: 146, link: '',
            },
            {
                id: 2, name: 'Open TG-GATEs Rat', species: 'R.norvegicus', num_compounds: 140, link: '',
            },
            {
                id: 3, name: 'DrugMatrix Rat', species: 'R.norvegicus', num_compounds: 125, link: '',
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
            {
                Header: 'Molecular Profiles',
                accessor: 'link',
                sortable: 'false',
                minWidth: 200,
                Cell: (row) => {
                    console.log(row);
                    return (
                        <button type="button">
                            <Link style={{ color: 'white' }} to="/expression_datafiles/" target="_blank" download>
                                Download
                                {' '}
                                <img src={downloadIcon} alt="download icon" />
                            </Link>
                        </button>
                    );
                },
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
