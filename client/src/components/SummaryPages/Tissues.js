import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const Styledtissues = styled.div`
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

class Tissues extends Component {
    constructor() {
        super();
        this.state = {
            tissueData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/tissues')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ tissueData: data, loading: false });
            });
    }

    render() {
        const { loading, tissueData } = this.state;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 200,
            },
        ];

        return (
            <Styledtissues>
                <div className="wrapper">
                    <h1>List of tissues</h1>
                    <ReactTable
                        data={tissueData}
                        columns={columns}
                        className="-highlight"
                        showPagination={false}
                        defaultPageSize={2}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </Styledtissues>
        );
    }
}


export default Tissues;
