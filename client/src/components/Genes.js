import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import colors from '../styles/colors';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;

  #dsetMiniPlot {
    margin-left:40px;
  }

  #dsetLegend {
    margin: 20px 0px 0px 40px;
    
    &span {
      line-height:5px;
      font-size:85%;
    }
    
  }
 
`;

class Genes extends Component {
  constructor() {
    super();
    this.state = {
      geneData: null,
    };
  }

  componentDidMount() {
    fetch('/api/v1/genes')
      .then((response) => response.json())
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({ geneData: data });
        //   const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
        //   this.setState({ drugsData1: [{ value: 'Any', label: 'Any Compound' }, ...drugsData] });
        //   this.setState({ drugsData2: [{ value: 'Any', label: 'Any Compound' }, ...drugsData] });
      });
    // this.setState({ geneData: [] });
  }

  render() {
    const { geneData } = this.state;
    console.log(geneData);
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
      Header: 'Source',
      accessor: 'entrez_id',
      sortable: false,
      Cell: (props) => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/gene/?term=${props.value}`}>{props.value}</a>,
    }];

    return (
      <div>
        <h1>List of Genes</h1>
        { geneData ? (
          <ReactTable
            data={geneData}
            columns={columns}
            className="-highlight"
            defaultPageSize={7}
          />
        ) : null}

      </div>
    );
  }
}


export default Genes;
