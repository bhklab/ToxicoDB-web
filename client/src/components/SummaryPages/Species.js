import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const Styledspecies = styled.div`
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

class Species extends Component {
    constructor() {
        super();
        this.state = {
            modelData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/species')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ modelData: data, loading: false });
            });
    }

    render() {
        const { loading, modelData } = this.state;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 200,
            },
        ];

        return (
            <Styledspecies>
                <div className="wrapper">
                    <h1>List of species</h1>
                    <ReactTable
                        data={modelData}
                        columns={columns}
                        className="-highlight"
                        showPagination={false}
                        defaultPageSize={3}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </Styledspecies>
        );
    }
}


export default Species;
