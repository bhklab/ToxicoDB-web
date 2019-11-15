import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            sortable: true,
            minWidth: 200,
        }, {
            Header: 'PubChem ID',
            accessor: 'pubchem',
            sortable: false,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`http://useast.ensembl.org/Homo_sapiens/drug/Summary?g=${props.value}`}>{props.value}</a>,
        }, {
            Header: 'Chembl ID',
            accessor: 'chembl',
            sortable: false,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/drug/?term=${props.value}`}>{props.value}</a>,
        }, {
            Header: 'DrugBank',
            accessor: 'drugbank',
            sortable: false,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/drug/?term=${props.value}`}>{props.value}</a>,
        }, {
            Header: 'Targets',
            accessor: 'targets',
            sortable: false,
        },{
            Header: 'Class',
            accessor: 'class',
            sortable: false,
        },{
            Header: 'Class name',
            accessor: 'class_name',
            sortable: false,
        },{
            Header: 'ATC Code',
            accessor: 'atc_code',
            sortable: false,
            Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/drug/?term=${props.value}`}>{props.value}</a>,
        }, 
    ];

    return (
      <StyledDrugs>
        <div className="wrapper">
          <h1>List of drugs</h1>
          <ReactTable
            data={drugData}
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
