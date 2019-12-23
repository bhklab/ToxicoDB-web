import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import * as d3 from 'd3';
import colors from '../../styles/colors';

const StyledDiv = styled.div`
min-height: 600px;    
width: 100%;    
    // .groups:nth-of-type(3) {
    //     transform: translate(0, 50px);
    // }
    .js-plotly-plot {
        width: 100%;
    }
    .scatterpts {
        opacity: 0;
    }
`;

const d3Changes = (type) => {
    d3.select('.groups:nth-of-type(1) path.scatterpts').style('fill', 'black');
    if (type == 'drug') {
        d3.select('.groups:nth-of-type(2) path.scatterpts').style('fill', 'black');
        d3.selectAll('.groups:nth-of-type(3) .legendtoggle').style('cursor', 'default');
        d3.select('.groups:nth-of-type(3)').attr('transform', 'translate(0,100)');
    } else {
        d3.selectAll('.groups:nth-of-type(2) .legendtoggle').style('cursor', 'default');
        d3.select('.groups:nth-of-type(2)').attr('transform', 'translate(0,100)');
    }
    
    d3.select('g.scrollbox').attr('clip-path', '');

    d3.select('.legendTitle').remove();
    d3.select('g.legend').append('text')
        .attr('class', 'legendTitle')
        .attr('fill', 'black')
        .attr('x', 20)
        .attr('y', 20)
        .text('Dataset Selectors')

    d3.select('.scrollbox').attr('transform', 'translate(0,30)');
};

const click = (data, type, queryId) => {

    const id = parseInt(data.points[0].data.click_ids[data.points[0].pointIndex]);
    if (type == 'drug') {
        document.location.href = `/expression?drugId=${queryId}&geneId=${id}`;
    } else {
        document.location.href = `/expression?drugId=${id}&geneId=${queryId}`;
    }
}

class VolcanoPlotly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            data: null,
        };
    }

    componentDidMount() {
        const {
            data, type, queryId
        } = this.props;
        this.formatData(data);
    }


    formatData(data) {
        const { type } = this.props;
        // setting up the traces; can't really deep copy
        const greenTraceRat = {
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
                symbol: 'triangle-up',
                size:8,
            },
            name: 'TGGATES Rat LDH',
            legendgroup: 'TGGATES Rat LDH',
        };

        const greenTraceHuman = {
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
                symbol: 'square',
                size:7,
            },
            name: 'TGGATES Human LDH',
            legendgroup: 'TGGATES Human LDH',
        };

        const blueTraceRat = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            click_ids: [],
            hoverinfo: 'text',
            hovertext: [],
            marker: {
                color: '#4c84b1',
                symbol: 'triangle-up',
                size:8,
            },
            name: 'TGGATES Rat LDH',
            legendgroup: 'TGGATES Rat LDH',
        };

        const blueTraceHuman = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            click_ids: [],
            hoverinfo: 'text',
            hovertext: [],
            marker: {
                color: '#4c84b1',
                symbol: 'square',
                size:7,
            },
            name: 'TGGATES Human LDH',
            legendgroup: 'TGGATES Human LDH',
        };

        const greenLegendTrace = {
            type: 'none',
            mode: 'markers',
            // visible: 'legendonly',
            hoverinfo: 'none',
            // opacity: 0,
            x: [null],
            y: [null],
            marker: {
                color: '#5cc33c',
            },
            name: 'fdr < 0.05 and |fold change| >= 1',
            legendgroup: 'legend',
        };

        const blueLegendTrace = {
            type: 'none',
            mode: 'markers',
            // visible: 'legendonly',
            hoverinfo: 'none',
            // opacity: 0,
            x: [null],
            y: [null],
            marker: {
                color: '#4c84b1',
            },
            name: 'fdr < 0.05 and |fold change| < 1',
            legendgroup: 'legend',
        };

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => (parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value))).filter((x) => x !== null)));

        // putting data in
        data.forEach((d) => {
            if (parseFloat(d.p_value) <= 0.05) {
                if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) >= 1) {
                    const trace = d.dataset_name === 'TGGATES Human LDH' ? greenTraceHuman : greenTraceRat;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    if (type == 'drug') {
                        trace.click_ids.push(d.gene_id);
                    } else {
                        trace.click_ids.push(d.drug_id);
                    }
                    trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
                } else if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) < 1) {
                    const trace = d.dataset_name === 'TGGATES Human LDH' ? blueTraceHuman : blueTraceRat;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    if (type == 'drug') {
                        trace.click_ids.push(d.gene_id);
                    } else {
                        trace.click_ids.push(d.drug_id);
                    }
                    trace.hovertext.push(`(${parseFloat(d.fold_change).toFixed(1)}, ${(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value)).toFixed(1)}) ${d.drug_name || d.gene_name}`);
                }
            }
        });

        this.setState({
            data: [greenTraceRat, blueTraceRat, greenTraceHuman, blueTraceHuman, blueLegendTrace, greenLegendTrace],
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
                legend: {
                    traceorder: 'grouped',
                },
                margin: {
                    l: 45,
                    r: 0,
                    t: 0,
                    b: 40,
                },
            },
        });
    }

    render() {
        const { layout, data } = this.state;
        const { plotId, type, queryId } = this.props;
        return (
            <StyledDiv>
                <Plot
                    data={data}
                    layout={layout}
                    graphDiv={plotId}
                    config={{
                        responsive: true,
                        displayModeBar: false,
                    }}
                    onLegendClick={(e) => !(e.expandedIndex >= 4)}
                    onUpdate={() => d3Changes(type)}
                    onClick={(d) => click(d,type, queryId)}
                />
            </StyledDiv>
        );
    }
}

export default VolcanoPlotly;
