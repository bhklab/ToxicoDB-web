import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import queryString from 'query-string';
import Plot from 'react-plotly.js';


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
            drugName: "",
            geneName: ""
        }
    }

    formatData = (expData) => {
        let data = [];

        // different colours for each dose, same colours for each replicate
        let colours = ["#18c61a", "#9817ff", "#d31911", "#24b7f1", "#fa82ce", "#736c31"]

        // different line dash types for each replicate
        let dashTypes = ["solid", "dot", "dash", "longdash", "dashdot", "longdashdot"]

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
                traces[item.dose]["rep".concat(item.replicate)]["x"] = [item.time];
                traces[item.dose]["rep".concat(item.replicate)]["y"] = [item.expression];
                traces[item.dose]["rep".concat(item.replicate)]["mode"] = "lines+markers";
                traces[item.dose]["rep".concat(item.replicate)]["name"] = `${item.dose} replicate ${item.replicate}`;
                traces[item.dose]["rep".concat(item.replicate)]["line"] =   {color: colours[dInd], dash: dashTypes[rInd], width: 4}
                traces[item.dose]["rep".concat(item.replicate)]["legendgroup"] = "legend"

            } else {
                traces[item.dose]["rep".concat(item.replicate)]["x"].push(item.time);
                traces[item.dose]["rep".concat(item.replicate)]["y"].push(item.expression);
            }
        })

        Object.keys(traces).forEach((dose) => {
            Object.keys(traces[dose]).forEach((rep) => {
                data.push(traces[dose][rep])
            })
        })

        //pushing dataset selectors to data as traces as well - empty datapoints, but just for the legend
        // finding datasets
        let datasets = Array.from(new Set(expData.map((x) => {return x.name;})));
        for (let i = 0; i < datasets.length; i++) {
            let trace = {}
            trace["x"] = []
            trace["y"] = []
            trace["mode"] = "marker";
            trace["name"] = datasets[i];
            trace["legendgroup"] = datasets[i];
            data.push(trace)
        }
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
                this.setState({ expressionData: expData});
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
        const {expressionData, drugName, geneName} = this.state;
        const layout = {
            autosize:true
        }
        return (
        <StyledExpressionPlot>
            {expressionData.length == 0 && drugName == "" && geneName == "" ? null : (
                <Fragment>
                    <h1>Effects of {drugName} on {geneName}</h1>
                    <Plot
                        data={expressionData}
                        layout={layout}
                        divId={"expPlot"}
                        style={{
                            width:"100%",
                            height:"100%",
                            minHeight:"700px"
                        }}
                        useResizeHandler={true}
                    />
                </Fragment>
                
            )} 
        </StyledExpressionPlot>
        );
    }
}


export default ExpressionPlot;
