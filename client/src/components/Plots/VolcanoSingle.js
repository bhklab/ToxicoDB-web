/* eslint-disable radix */
import React, {
    Component, Fragment, useState, useEffect,
} from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import * as d3 from 'd3';
import { NONAME } from 'dns';
import colors from '../../styles/colors';

const StyledDiv = styled.div`
    min-height: 600px;    
    width: 100%;    

    h3 {
        text-align: center;
    }
    .js-plotly-plot {
        width: 100%;
    }
    .scatterpts {
        opacity: 0;
    }

`;

const d3Changes = (type) => {
    d3.select('.groups:nth-of-type(1) path.scatterpts').style('fill', 'black');
    if (type === 'drug') {
        d3.select('.groups:nth-of-type(2) path.scatterpts').style('fill', 'black');
        d3.selectAll('.groups:nth-of-type(3) .legendtoggle').style('cursor', 'default');
        d3.select('.groups:nth-of-type(3)').attr('transform', 'translate(0,100)');
    } else {
        d3.selectAll('.groups:nth-of-type(2) .legendtoggle').style('cursor', 'default');
        d3.select('.groups:nth-of-type(2)').attr('transform', 'translate(0,100)');
    }

    d3.select('g.scrollbox').attr('clip-path', '');

    d3.select('.scrollbox').attr('transform', 'translate(0,30)');
};

// for clicking on the points
const click = (data, type, queryId) => {
    const id = parseInt(data.points[0].data.click_ids[data.points[0].pointIndex]);
    if (type === 'drug') {
        document.location.href = `/expression?drugId=${queryId}&geneId=${id}`;
    } else {
        document.location.href = `/expression?drugId=${id}&geneId=${queryId}`;
    }
};

// for changing the cursor on hover of points
const hover = () => {
    d3.selectAll('.nsewdrag').style('cursor', 'pointer');
};

const unhover = () => {
    d3.selectAll('.nsewdrag').style('cursor', '');
};

// // after plotting, return the datasetName
// // to show that it's done loading
// const afterPlot = () => {
//     // pass prop to parent - loading: done
// }

const VolcanoSingle = (props) => {
    const [state, setState] = useState({
        layout: null,
        data: null,
        class: null,
        // loading: false,
    });

    const {
        data, type, queryId, datasetName, plotId, selected,
    } = props;

    const formatData = (data) => {
        // setting up the traces; can't really deep copy
        const greenTrace = {
            showlegend: false,
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            click_ids: [],
            hoverinfo: 'text',
            hovertext: [],
            marker: {
                color: '#5cc33c',
                size: 8,
            },
            name: 'green',
        };

        const blueTrace = {
            showlegend: false,
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            click_ids: [],
            // hoverinfo: 'text',
            // hovertext: [],
            hoverinfo: 'none',
            marker: {
                color: '#e1f1fb',
                size: 8,
            },
            name: 'blue',
        };

        // const grayTrace = {
        //     showlegend: false,
        //     type: 'scatter',
        //     mode: 'markers',
        //     x: [],
        //     y: [],
        //     click_ids: [],
        //     hoverinfo: 'text',
        //     hovertext: [],
        //     marker: {
        //         color: 'lightgray',
        //         size: 8,
        //     },
        //     name: 'gray',
        // };

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => (parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value))).filter((x) => x !== null)));

        // putting data in
        data.forEach((d) => {
            if (parseFloat(d.p_value) <= 0.05) {
                if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) >= 1) {
                    const trace = greenTrace;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    if (type === 'drug') {
                        trace.click_ids.push(d.gene_id);
                    } else {
                        trace.click_ids.push(d.drug_id);
                    }
                    trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
                } else if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) < 1) {
                    const trace = blueTrace;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    if (type === 'drug') {
                        trace.click_ids.push(d.gene_id);
                    } else {
                        trace.click_ids.push(d.drug_id);
                    }
                    // trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
                }
                // else if (parseFloat(d.fdr) >= 0.05 && Math.abs(d.fold_change) < 1) {
                //     const trace = grayTrace
                //     trace.x.push(d.fold_change);
                //     trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                //     if (type == 'drug') {
                //         trace.click_ids.push(d.gene_id);
                //     } else {
                //         trace.click_ids.push(d.drug_id);
                //     }
                //     trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
                // }
            }
            // else {
            //     const trace = grayTrace
            //         trace.x.push(d.fold_change);
            //         trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
            //         if (type == 'drug') {
            //             trace.click_ids.push(d.gene_id);
            //         } else {
            //             trace.click_ids.push(d.drug_id);
            //         }
            //         trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
            // }
        });

        // if dataset is not selected, give class hidden to hide
        const className = selected.includes(datasetName) ? 'plot' : 'plot hidden';

        setState({
            ...state,
            data: [greenTrace, blueTrace],
            layout: {
                height: 600,
                autosize: true,
                // width: 800,
                paper_bgcolor: 'white',
                plot_bgcolor: 'white',
                orientation: 'v',
                yaxis: { ticklen: 0, title: '-log10(p value)' },
                xaxis: { title: '-log2(fold change)', zeroline: false },
                hovermode: 'closest',
                font: {
                    size: 12,
                    color: colors.nav_links,
                    family: 'Arial',
                },
                margin: {
                    l: 45,
                    r: 0,
                    t: 0,
                    b: 40,
                },
            },
            class: className,
        });
    };

    // initial render - like a componentdidmount, only runs once
    useEffect(() => {
        setState({
            ...state,
            layout: null,
            data: null,
            class: null,
        });
        formatData(data);
    }, []);

    // determining if selected changes
    useEffect(() => {
        setState({
            ...state,
            layout: null,
            data: null,
            class: null,
        });
        formatData(data);
    }, [selected]);


    return (
        <StyledDiv className={state.class}>
            <h3>
                {(datasetName === 'TGGATESHumanLDH') ? 'TGGATES Human (LDH)'
                    : (datasetName === 'TGGATESRatLDH') ? 'TGGATES Rat (LDH)'
                        : (datasetName === 'drugMatrix') ? 'DrugMatrix'
                            : datasetName}

            </h3>
            <Plot
                data={state.data}
                layout={state.layout}
                graphDiv={plotId}
                config={{
                    responsive: true,
                    displayModeBar: false,
                }}
                onClick={(d) => click(d, type, queryId)}
                onHover={() => hover()}
                onUnhover={() => unhover()}
                // onAfterPlot={() => afterPlot()}
            />
        </StyledDiv>
    );
};

export default VolcanoSingle;
