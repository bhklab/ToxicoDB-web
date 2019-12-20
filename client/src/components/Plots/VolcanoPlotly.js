import React from 'react';
import Plot from 'react-plotly.js';
import colors from '../../styles/colors';


class VolcanoPlotly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            data: null,
            loading: true,
            displayPlot: true,
        };
    }

    componentDidMount() {
        const {
            data, queryId, plotId, type,
        } = this.props;
        console.log(data);
        const formattedData = this.formatData(data);
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
            marker: {
                color: '#5cc33c',
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
            marker: {
                color: '#5cc33c',
            },
            name: 'TGGATES Human LDH',
            legendgroup: 'TGGATES Human LDH',
        };

        const blueTraceRat = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            marker: {
                color: '#4c84b1',
            },
            name: 'TGGATES Rat LDH',
            legendgroup: 'TGGATES Rat LDH',
        };

        const blueTraceHuman = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            marker: {
                color: '#4c84b1',
            },
            name: 'TGGATES Human LDH',
            legendgroup: 'TGGATES Human LDH',
        };

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => (parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value))).filter((x) => x !== null)));

        // putting data in
        data.forEach((d, i) => {
            if (parseFloat(d.p_value) <= 0.05 && parseFloat(d.p_value) > 0) {
                if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) >= 1) {
                    const trace = d.dataset_name === 'TGGATES Human LDH' ? greenTraceHuman : greenTraceRat;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                } else if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) < 1) {
                    const trace = d.dataset_name === 'TGGATES Human LDH' ? blueTraceHuman : blueTraceRat;
                    trace.x.push(d.fold_change);
                    trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                }
            }
        });

        this.setState({
            data: [greenTraceRat, blueTraceRat, greenTraceHuman, blueTraceHuman],
            layout: {
                height: 450,
                width: 800,
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
            },
        });
    }

    render() {
        const { layout, data } = this.state;
        const { plotId } = this.props;
        return (
            <Plot
                data={data}
                layout={layout}
                graphDiv={plotId}
                config={{ responsive: true }}
            />
        );
    }
}

export default VolcanoPlotly;
