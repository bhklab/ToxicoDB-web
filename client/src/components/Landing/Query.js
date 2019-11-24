import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';


const StyledQuery = styled.div`
    text-align: center !important;
    font-family: 'Raleway', sans-serif;

    h2 {
        color: ${colors.blue_header};
        
    }
    .desc {
        background:${colors.lightblue_bg};
        text-align:left;
        color: ${colors.blue_text};
        padding: 15px;
        line-height:30px;
        border-radius:20px;
        margin: 0px 10px;
    }
`;


class Query extends Component {
  constructor() {
    super();
    this.state = {
      // queryName: this.props.queryName,
      queryDesc: '',
    };
  }

  componentDidMount() {
    const {
      queryName,
    } = this.props;

    // getting the description from pubchem
  }

  render() {
    const { queryName, queryDesc } = this.props;
    return (
      <StyledQuery>
        <h2>{queryName}</h2>
        <div className="desc">
                    A mitochondrial cytochrome P450 enzyme that catalyzes the 11-beta-hydroxylation of steroids
                    in the presence of molecular oxygen and NADPH-FERRIHEMOPROTEIN REDUCTASE.
        </div>
      </StyledQuery>
    );
  }
}

export default Query;
