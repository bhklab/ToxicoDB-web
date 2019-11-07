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
    this.setState({ geneData: [] });
  }

  render() {
    return (
      <div>Gene Table</div>
    );
  }
}


export default Genes;
