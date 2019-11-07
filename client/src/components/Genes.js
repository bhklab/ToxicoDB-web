import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import colors from '../styles/colors';

class Genes extends Component {
  constructor() {
    super();
    this.state = {
      geneData: null,
    };
  }

  componentDidMount() {
    fetch('/api/v1/genes')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        console.log(res);
        //   const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
        //   this.setState({ drugsData1: [{ value: 'Any', label: 'Any Compound' }, ...drugsData] });
        //   this.setState({ drugsData2: [{ value: 'Any', label: 'Any Compound' }, ...drugsData] });
      });
    // this.setState({ geneData: [] });
  }

  render() {
    return (
      <div>Gene Table</div>
    );
  }
}


export default Genes;
