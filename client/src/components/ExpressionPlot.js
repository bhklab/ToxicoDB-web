import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import queryString from 'query-string';
import Expression from './Plots/Expression';

import Loading from './Utils/Loading';


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
            datasets: [],
            loading:true,
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
            let dsetName = item.name.replaceAll(" ", "")
            if (traces[dsetName] == undefined) {
                traces[dsetName] = {}
                dInd = -1
            }
            if (traces[dsetName][item.dose] == undefined) { // if dose doesn't exist
                traces[dsetName][item.dose] = {}
                dInd++;
                rInd = -1; // reset dash types
            }
            if (traces[dsetName][item.dose]["rep".concat(item.replicate)] == undefined) { // if dose exists, but the replicate doesn't
                traces[dsetName][item.dose]["rep".concat(item.replicate)] = {};
                rInd++;
            } 
            if (Object.keys(traces[dsetName][item.dose]["rep".concat(item.replicate)]).length == 0) { // add data to replicate
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["points"] = [{time:item.time, exp:item.expression}];
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["mode"] = dashTypes[rInd]; // if solid, don't have dash-array
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["label"] = `${item.dose} replicate ${item.replicate}`; // legend label
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["color"] =   colours[dInd];
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["class"] = `${item.name.replaceAll(" ", "")}` // has the dataset as class 

            } else {
                traces[dsetName][item.dose]["rep".concat(item.replicate)]["points"].push({time:item.time, exp:item.expression});
            }
        })

        Object.keys(traces).forEach((c) => {
            Object.keys(traces[c]).forEach((dose) => {
                Object.keys(traces[c][dose]).forEach((rep) => {
                    data.push(traces[c][dose][rep])
                })
            })
        })

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

                // find [min,max] time and expression for the axes, and summary stats for dose
                console.log(data)
                let times = data.map((x) => x.time);
                let exps = data.map((x) => x.expression);

                // find datasets for the legend
                let datasets = [...new Set(data.map((x) => x.name))]

                this.setState({ 
                    expressionData: expData, 
                    xRange: [Math.min(...times) - 1, Math.max(...times) + 1],
                    yRange: [Math.min(...exps) - 1, Math.max(...exps) + 1],
                    datasets: datasets,
                    loading:false
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
        const {expressionData, drugName, geneName, xRange, yRange, summaryStats, datasets, loading} = this.state;
        return (
        <StyledExpressionPlot>
            {expressionData.length === 0 || drugName === "" || geneName === "" ? (
                <div className="loading-container">
                <Loading type="bubbles" width={150} height={150} color={colors.color_main_2} />
              </div>
            ) : (
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
