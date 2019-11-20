import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import queryString from 'query-string';
import Expression from './Plots/Expression';


const StyledExpressionPlot = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1.5em + 1vw);
        text-align:center;
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
            xRange: [],
            yRange: [],
            drugName: "",
            geneName: "",
            datasets: []
        }
    }

    formatData = (expData) => {
        let data = [];

        // different colours for each dose, same colours for each replicate
        let colours = ["#18c61a", "#9817ff", "#d31911", "#24b7f1", "#fa82ce", "#736c31"]

        // different line dash types for each replicate
        let dashTypes = ["solid", "5,5", "10,10", "20,10,10,10", "20,10,5,10,5"]

        let traces = {}
        // index for dose (colour), replicate (dash)
        let dInd = -1, rInd = -1;
        expData.forEach((item) => {
            if (traces[item.dose] == undefined) {
                traces[item.dose] = {}
                dInd++;
                rInd = -1; // reset dash types
            }
            if (traces[item.dose]["rep".concat(item.replicate)] == undefined) {
                traces[item.dose]["rep".concat(item.replicate)] = {};
                rInd++;
            } 
            if (Object.keys(traces[item.dose]["rep".concat(item.replicate)]).length == 0) {
                traces[item.dose]["rep".concat(item.replicate)]["points"] = [{time:item.time, exp:item.expression}];
                traces[item.dose]["rep".concat(item.replicate)]["mode"] = dashTypes[rInd]; // if solid, don't have dash-array
                traces[item.dose]["rep".concat(item.replicate)]["label"] = `${item.dose} replicate ${item.replicate}`; // legend label
                traces[item.dose]["rep".concat(item.replicate)]["color"] =   colours[dInd];
                traces[item.dose]["rep".concat(item.replicate)]["class"] = `${item.name}` // has the dataset as class 

            } else {
                traces[item.dose]["rep".concat(item.replicate)]["points"].push({time:item.time, exp:item.expression});
            }
        })

        Object.keys(traces).forEach((dose) => {
            Object.keys(traces[dose]).forEach((rep) => {
                data.push(traces[dose][rep])
            })
        })

        console.log(data)
        return data;
    }

    componentDidMount() {
        const { location } = this.props;
        const requestParams = queryString.parse(location.search);
        const {
        drugId, geneId
        } = requestParams;

        fetch(`/api/v1/experiments?drugId=${drugId}&geneId=${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const expData = this.formatData(data)

                // find [min,max] time and expression for the axes
                let times = data.map((x) => x.time);
                let exps = data.map((x) => x.expression);

                // find datasets for the legend
                let datasets = data.map((x) => x.name)

                this.setState({ 
                    expressionData: expData, 
                    xRange: [Math.min(...times) - 1, Math.max(...times) + 1],
                    yRange: [Math.min(...exps) - 1, Math.max(...exps) + 1],
                    datasets: datasets
                });
            });

        fetch(`/api/v1/drugs/${drugId}`)
            .then((response) => response.json())
            .then((res) => {
                const {data} = res;
                this.setState({ drugName: data[0].name});
            });

        fetch(`/api/v1/genes/${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const {data} = res;
                this.setState({ geneName: data[0].name});
            });
    }

    

    render() {
        const {expressionData, drugName, geneName, xRange, yRange, datasets} = this.state;
        return (
        <StyledExpressionPlot>
            {expressionData.length === 0 || drugName === "" || geneName === "" ? null : (
                <Fragment>
                    <h1>Effects of {drugName} on {geneName}</h1>
                    <Expression
                        data={expressionData}
                        plotId="expPlot"
                        xRange={xRange}
                        yRange={yRange}
                        datasets={datasets}
                    />
                </Fragment>
                
            )} 
        </StyledExpressionPlot>
        );
    }
}


export default ExpressionPlot;
