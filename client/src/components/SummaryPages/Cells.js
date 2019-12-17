import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledCells = styled.div`
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

    .rt-td {
            white-space: normal !important;
    }
`;

const cellDescription = {
    1: {
        Name: 'Primary hepatocytes',
        Description: `Primary hepatocytes, derived from isolated from liver tissue, 
                        express typical hepatic functions and express drug metabolising enzymes. 
                        Hence it serves as the closest model in vitro for toxicity studies.`,
    },
};


class Cells extends Component {
    constructor() {
        super();
        this.state = {
            cellData: [],
            loading: true,
        };
    }

    componentDidMount() {
        fetch('/api/v1/cells')
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                // adding description to the object.
                data.forEach((element, i) => {
                    data[i].description = cellDescription[element.id].Description;
                });
                // setting the state.
                this.setState({ cellData: data, loading: false });
            });
    }

    render() {
        const { loading, cellData } = this.state;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                minWidth: 70,
            },
            {
                Header: 'Description',
                accessor: 'description',
                sortable: true,
                minWidth: 200,
            },
        ];

        return (
            <StyledCells>
                <div className="wrapper">
                    <h1>List of Cells</h1>
                    <ReactTable
                        data={cellData}
                        columns={columns}
                        className="-highlight"
                        showPagination={false}
                        defaultPageSize={2}
                        loading={loading}
                        LoadingComponent={LoadingComponent}
                    />
                </div>
            </StyledCells>
        );
    }
}


export default Cells;
