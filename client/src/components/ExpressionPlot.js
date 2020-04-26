import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import queryString from 'query-string';
import colors from '../styles/colors';
import Expression from './Plots/Expression';


const StyledExpressionPlot = styled.div`
    width: 80vw;
    max-width: 1200px;
    min-height: 800px;
    padding:140px 0px;
    color: ${colors.blue_text};
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    .loading-container {
        margin: auto;
        width: 150px;
    }
`;


class ExpressionPlot extends Component {
    constructor() {
        super();
        this.state = {
            expressionData: [],
            xRange: [],
            yRange: [],
            compoundName: '',
            compoundId: 0,
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
            compoundId, geneId,
        } = requestParams;
        this.setState({ compoundId, geneId });
        fetch(`/api/v1/experiments?drugId=${compoundId}&geneId=${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                fetch('/api/v1/experiments/control')
                    .then((response) => response.json())
                    .then((controlRes) => {
                        const controlData = controlRes.data;
                        const expData = this.formatData(data, controlData);

                        // find [min,max] time and expression for the axes,
                        // and summary stats for dose
                        const times = data.map((x) => x.time);
                        const exps = data.map((x) => x.expression);

                        // find datasets for the legend
                        const datasets = [...new Set(data.map((x) => x.name))];

                        // getting control points for range
                        const controlTimes = [];
                        const controlExps = [];
                        expData.forEach((x) => {
                            if (x.class === 'DrugMatrix Rat' && x.label === 'Control replicate 1') {
                                x.points.forEach((i) => {
                                    controlTimes.push(i.time);
                                    controlExps.push(i.exp);
                                });
                            }
                        });
                        // determining x/yrange to encompass control ranges as well
                        let xRange;
                        let yRange;
                        // DrugMatrix Rat doesn't exist, don't include control
                        if (controlTimes.length === 0) {
                            xRange = [Math.min(...times) - 1, Math.max(...times) + 1];
                            yRange = [Math.min(...exps) - 1, Math.max(...exps) + 1];
                        } else {
                            xRange = [
                                Math.min(Math.min(...times) - 1, Math.min(...controlTimes) - 1),
                                Math.min(Math.max(...times) + 1, Math.max(...controlTimes) + 1),
                            ];
                            yRange = [
                                Math.min(Math.min(...exps) - 1, Math.min(...controlExps) - 1),
                                Math.max(Math.max(...exps) + 1, Math.max(...controlExps) + 1),
                            ];
                        }


                        this.setState({
                            expressionData: expData,
                            xRange,
                            yRange,
                            datasets,
                            loading: false,
                        });
                    });
            });

        fetch(`/api/v1/drugs/${compoundId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ compoundName: data[0].name });
            });

        fetch(`/api/v1/genes/${geneId}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({ geneName: data[0].symbol.toUpperCase() });
            });
    }

    // eslint-disable-next-line class-methods-use-this
    formatData(expData, controlData) {
        /* Parsing the experiment data */

        // different colours for each dose, same colours for each replicate
        const colorMap = {
            Control: '#18c61a',
            Low: '#9817ff',
            Middle: '#d31911',
            High: '#24b7f1',
        };
        // const colours = ['#18c61a', '#9817ff', '#d31911', '#24b7f1', '#fa82ce', '#736c31'];
        const doses = ['Control', 'Low', 'Middle', 'High'];

        // different line dash types for each replicate
        const dashTypes = ['solid', '5,5', '10,10', '20,10,10,10', '20,10,5,10,5'];

        const traces = {};
        // index for replicate (dash)
        // let rInd = -1;

        // check if DrugMatrix Rat is in there - then use control
        let useControl = false;
        expData.forEach((item) => {
            const dsetName = item.name.replaceAll(' ', '');
            if (dsetName === 'DrugMatrix Rat') {
                useControl = true;
            }
            if (traces[dsetName] === undefined) {
                traces[dsetName] = {};
                doses.forEach((dose) => {
                    traces[dsetName][dose] = {};
                });
                // rInd = -1; // reset replicate
            }
            if (traces[dsetName][item.dose]['rep'.concat(item.replicate)] === undefined) { // if dose exists, but the replicate doesn't
                traces[dsetName][item.dose]['rep'.concat(item.replicate)] = {};
                // rInd++;
            }
            if (Object.keys(traces[dsetName][item.dose]['rep'.concat(item.replicate)]).length === 0) { // if no data in replicate
                // if DrugMatrix Rat, then must average points with more than one value
                // make into {time: [expression]}
                if (dsetName === 'DrugMatrix Rat') {
                    const temp = {};
                    temp[item.time] = [item.expression];
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points = temp;
                } else {
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points = [{ time: item.time, exp: item.expression }];
                }
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].mode = dashTypes[item.replicate - 1]; // if solid, don't have dash-array
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].label = `${item.dose} replicate ${item.replicate}`; // legend label
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].color = colorMap[item.dose];
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].class = `${item.name.replaceAll(' ', '')}`; // has the dataset as class
            } else if (dsetName === 'DrugMatrix Rat') {
                // if time key doesn't exist
                if (traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time] === undefined) {
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time] = [item.expression];
                } else {
                    traces[dsetName][item.dose]['rep'.concat(item.replicate)].points[item.time].push(item.expression);
                }
            } else {
                traces[dsetName][item.dose]['rep'.concat(item.replicate)].points.push({ time: item.time, exp: item.expression });
            }
        });

        // put in DrugMatrix Rat controls
        if (useControl) {
            const temp = {};
            temp.points = [];
            [temp.mode] = dashTypes;
            temp.label = 'Control replicate 1';
            temp.color = colorMap.Control;
            temp.class = 'DrugMatrix Rat';
            temp.points = { 16: [], 24: [] };
            controlData.forEach((item) => {
                temp.points[item.time].push(item.expression);
            });
            traces['DrugMatrix Rat'].Control.rep1 = temp;

            // parse multiple timepoints into averages - specific to DrugMatrix Rat
            Object.keys(traces['DrugMatrix Rat']).forEach((dose) => {
                Object.keys(traces['DrugMatrix Rat'][dose]).forEach((rep) => {
                    // eslint-disable-next-line no-shadow
                    const temp = [];
                    Object.keys(traces['DrugMatrix Rat'][dose][rep].points).forEach((time) => {
                        const tempObj = {};
                        tempObj.time = parseInt(time, 10);
                        tempObj.exp = traces['DrugMatrix Rat'][dose][rep].points[time].reduce(
                            (total, x) => total + x,
                        ) / traces['DrugMatrix Rat'][dose][rep].points[time].length;
                        temp.push(tempObj);
                    });
                    traces['DrugMatrix Rat'][dose][rep].points = temp;
                });
            });
        }

        const data = [];
        Object.keys(traces).forEach((dset) => {
            Object.keys(traces[dset]).forEach((dose) => {
                Object.keys(traces[dset][dose]).forEach((rep) => {
                    data.push(traces[dset][dose][rep]);
                });
            });
        });
        return data;
    }


    render() {
        const {
            expressionData, compoundName, geneName, compoundId, geneId,
            xRange, yRange, datasets, loading,
        } = this.state;
        return (
            <StyledExpressionPlot>
                {loading ? (
                    <div className="loading-container">
                        <ReactLoading type="bubbles" width={150} height={150} color={colors.blue_header} />
                    </div>
                ) : (
                    <>
                        <h1>
                                Effects of
                            {' '}
                            <Link to={`/compounds/${compoundId}`}>{compoundName}</Link>
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
                        {/* <button><a id="downloadExpression" href="#">Download SVG</a></button> */}
                    </>

                )}
            </StyledExpressionPlot>
        );
    }
}


export default ExpressionPlot;
