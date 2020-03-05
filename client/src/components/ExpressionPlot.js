import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import colors from '../styles/colors';
import Expression from './Plots/Expression';

import Loading from './Utils/Loading';


const StyledExpressionPlot = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
    h1 {
        color: ${colors.blue_header};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1.5em + 1vw);
        text-align:center;
        margin:50px 0 40px 0;
    }
    a {
      color: ${colors.red_highlight};
    }
`;


class ExpressionPlot extends Component {
    constructor() {
        super();
        this.state = {
            expressionData: [],
            xRange: [],
            yRange: [],
            drugName: '',
            drugId: 0,
            geneId: 0,
            geneName: '',
            datasets: [],
            loading: true,
        };
    }

    componentDidMount() {
        const { location } = this.props;
        const requestParams = queryString.parse(location.search);
        const {
            drugId, geneId, 
        } = requestParams;
        this.setState({ drugId, geneId });
        fetch(`/api/v1/experiments?drugId=${drugId}&geneId=${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                fetch(`/api/v1/experiments/control`)
                    .then((response) => response.json())
                    .then((controlRes) => {
                        const controlData = controlRes.data;
                        const expData = this.formatData(data, controlData);

                        // find [min,max] time and expression for the axes, and summary stats for dose
                        const times = data.map((x) => x.time);
                        const exps = data.map((x) => x.expression);

                        // find datasets for the legend
                        const datasets = [...new Set(data.map((x) => x.name))];

                        this.setState({
                            expressionData: expData,
                            xRange: [Math.min(...times) - 1, Math.max(...times) + 1],
                            yRange: [Math.min(...exps) - 1, Math.max(...exps) + 1],
                            datasets,
                            loading: false,
                        });

                    })
            });

        fetch(`/api/v1/drugs/${drugId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ drugName: data[0].name });
            });

        fetch(`/api/v1/genes/${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ geneName: data[0].symbol.toUpperCase() });
            });
    }

    formatData(expData, controlData) {
        console.log("expdata", expData, "controlData", controlData)

        /* Parsing the experiment data */
        
        // different colours for each dose, same colours for each replicate
        const colorMap = {
            'Control': '#18c61a',
            'Low': '#9817ff',
            'Middle': '#d31911',
            'High': '#24b7f1'
        }
        // const colours = ['#18c61a', '#9817ff', '#d31911', '#24b7f1', '#fa82ce', '#736c31'];
        const doses = ['Control', 'Low', 'Middle', 'High'];

        // different line dash types for each replicate
        const dashTypes = ['solid', '5,5', '10,10', '20,10,10,10', '20,10,5,10,5'];

        const traces = {};
        // index for replicate (dash)
        let rInd = -1;

        // check if drugMatrix is in there - then use control
        let useControl = false;
        expData.forEach((item) => {
            const dsetName = item.name.replaceAll(' ', '');
            if (dsetName === 'drugMatrix') {
                useControl = true;
            }
            if (traces[dsetName] == undefined) {
                traces[dsetName] = {};
                doses.forEach((dose) => {
                    traces[dsetName][dose] = {}
                })
                rInd = -1; //reset replicate
            }
            if (traces[dsetName][item.dose]['rep'.concat(item.replicate)] === undefined) { // if dose exists, but the replicate doesn't
                traces[dsetName][item.dose]['rep'.concat(item.replicate)] = {};
                rInd++;
            }
            if (Object.keys(traces[dsetName][item.dose]['rep'.concat(item.replicate)]).length === 0) { // if no data in replicate
                // if drugMatrix, then must average points with more than one value
                // make into {time: [expression]}
                if (dsetName === 'drugMatrix') {
                    let temp = {};
                    temp[item.time] = [item.expression];
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points = temp;
                } else {
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points = [{ time: item.time, exp: item.expression }];
                }
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].mode = dashTypes[item.replicate-1]; // if solid, don't have dash-array
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].label = `${item.dose} replicate ${item.replicate}`; // legend label
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].color = colorMap[item.dose];
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].class = `${item.name.replaceAll(' ', '')}`; // has the dataset as class
            } else {
                if (dsetName === 'drugMatrix') {
                    // if time key doesn't exist
                    if (traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time] === undefined) {
                        traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time] = [item.expression];
                    }
                    else {
                        traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time].push(item.expression)
                    }
                } else {
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points.push({ time: item.time, exp: item.expression });
                }
            }
        });

        // put in drugMatrix controls
        if (useControl) {
            let temp = {};
            temp.points = [];
            temp.mode = dashTypes[0];
            temp.label = 'Control replicate 1';
            temp.color = colorMap['Control'];
            temp.class = 'drugMatrix'
            temp.points = { 16: [], 24: []};
            controlData.forEach((item) => {
                temp.points[item.time].push(item.expression);
            })
            traces["drugMatrix"]["Control"]["rep1"] = temp
        }

        // parse multiple timepoints into averages
        Object.keys(traces["drugMatrix"]).forEach((dose) => {
            Object.keys(traces["drugMatrix"][dose]).forEach((rep) => {
                let temp = [];
                Object.keys(traces["drugMatrix"][dose][rep].points).forEach((time) => {
                    let tempObj = {};
                    tempObj.time = parseInt(time);
                    tempObj.exp = traces["drugMatrix"][dose][rep].points[time].reduce((total, x) => total + x) / traces["drugMatrix"][dose][rep].points[time].length;
                    temp.push(tempObj);
                })
                traces["drugMatrix"][dose][rep].points = temp;
            })
        })

        console.log("traces", traces)

        const data = [];
        Object.keys(traces).forEach((dset) => {
            Object.keys(traces[dset]).forEach((dose) => {
                Object.keys(traces[dset][dose]).forEach((rep) => {
                    data.push(traces[dset][dose][rep]);
                });
            });
        });
        console.log("final data", data)
        return data;
    }


    render() {
        const {
            expressionData, drugName, geneName, drugId, geneId, xRange, yRange, summaryStats, datasets, loading,
        } = this.state;
        return (
            <StyledExpressionPlot>
                {expressionData.length === 0 || drugName === '' || geneName === '' ? (
                    <div className="loading-container">
                        <Loading type="bubbles" width={150} height={150} color={colors.color_main_2} />
                    </div>
                ) : (
                    <>
                        <h1>
Effects of
                            {' '}
                            <Link to={`/drugs/${drugId}`}>{drugName}</Link>
                            {' '}
on
                            {' '}
                            <Link to={`/genes/${geneId}`}>{geneName}</Link>
                        </h1>
                        <Expression
                            data={expressionData}
                            plotId="expPlot"
                            xRange={xRange}
                            yRange={yRange}
                            datasets={datasets}
                        />
                    </>

                )}
            </StyledExpressionPlot>
        );
    }
}


export default ExpressionPlot;
