import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';

import LoadingComponent from './Utils/Loading';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;
  width: 100%;
  margin: 20px;

  .wrapper {
    max-width: 1024px;
    width: 100%;
    padding: 20px;
  }
  
  a {
      color: ${colors.blue_text}
  }
  h1 {
    color: ${colors.blue_header}
  }
`;

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
      accessor: 'hgnc_id',
      sortable: true,
    }, {
      Header: 'Ensembl ID',
      accessor: 'name',
      sortable: true,
      Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${props.value}`}>{props.value}</a>,
    }, {
      Header: 'Entrez ID',
      accessor: 'entrez_id',
      sortable: false,
      Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/gene/?term=${props.value}`}>{props.value}</a>,
    }];

    return (
      <StyledWrapper>
        <div className="wrapper">
          <h1>List of Genes</h1>
          <ReactTable
            data={geneData}
            columns={columns}
            className="-highlight"
            defaultPageSize={25}
            loading={loading}
            LoadingComponent={LoadingComponent}
          />
        </div>
      </StyledWrapper>
    );
  }
}


export default Genes;
