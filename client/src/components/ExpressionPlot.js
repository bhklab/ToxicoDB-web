import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import queryString from 'query-string';


const StyledExpressionPlot = styled.div`
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
    a {
      color: ${colors.blue_text};
    }
`;


class ExpressionPlot extends Component {
    constructor() {
        super();
        this.state = {
            expressionData: [],
        }
    }

    componentDidMount() {
        const { location } = this.props;
        const requestParams = queryString.parse(location.search);
        const {
        drugId, geneId
        } = requestParams;

        console.log(drugId, geneId)
        fetch(`/api/v1/experiments?drugId=${drugId}&geneId=${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ expressionData: data});
            });
    }

    render() {
        const {expressionData} = this.state;
        console.log(expressionData)
        return (
        <StyledExpressionPlot>
            {expressionData.length == 0 ? null : (
               <span>hello</span>
            )} 
        </StyledExpressionPlot>
        );
    }
}


export default ExpressionPlot;
