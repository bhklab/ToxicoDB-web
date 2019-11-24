import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

import AnnotationCard from './AnnotationCard';

const StyledGenePage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(2em + 1vw);
        margin:50px 0 40px 0;
    }
    h2 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1.2em + 0.5vw);
        margin: 20px 0;
        font-weight:600;
    }

    a {
      color: ${colors.blue_text};
    }
`;


class GenePage extends Component {
  constructor() {
    super();
    this.state = {
      geneData: [],
      annotationData: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`/api/v1/genes/${params.id}`)
      .then((response) => response.json())
      .then((res) => {
        const { data } = res;
        const annotationData = [];
        Object.keys(data[0]).forEach((x, i) => {
          if (x !== 'name') {
            const temp = {
              name: x,
              value: data[0][x],
            };
            annotationData.push(temp);
          }
        });
        this.setState({ geneData: data[0], annotationData });
      });
  }

  render() {
    const { geneData, annotationData } = this.state;
    return (
      <StyledGenePage>
        {geneData.length === 0 ? null : (
          <div>
            <h1>{geneData.name}</h1>
            <h2>Annotations</h2>
            <AnnotationCard data={annotationData} />
          </div>
        )}
      </StyledGenePage>
    );
  }
}


export default GenePage;
