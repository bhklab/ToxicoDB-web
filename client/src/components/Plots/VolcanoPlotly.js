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
        const greenTrace = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            // ids: [],
            marker: {
                // hoverinfo: 'text',
                // hovertext: [],
                color: '#5cc33c',
            },
            name: 'fdr < 0.05, fold change >= |1|',
        };

        const blueTrace = {
            type: 'scatter',
            mode: 'markers',
            x: [],
            y: [],
            // ids: [],
            marker: {
                color: '#4c84b1',
            },
            name: 'fdr < 0.05, fold change < |1|',
        };

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => (parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value))).filter((x) => x !== null)));

        // putting data in
        data.forEach((d, i) => {
            if (parseFloat(d.p_value) <= 0.05 && parseFloat(d.p_value) > 0) {
                if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) >= 1) {
                    greenTrace.x.push(d.fold_change);
                    greenTrace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    // console.log(d.dataset_name, d.dataset_name.replaceAll(' ', ''));
                    // greenTrace.ids.push(d.dataset_name.replaceAll(' ', ''));
                    // greenTrace.marker.hovertext.push(type === 'drug' ? d.gene_name : d.drug_name);
                } else if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) < 1) {
                    blueTrace.x.push(d.fold_change);
                    blueTrace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                    // blueTrace.ids.push(d.dataset_name.replaceAll(' ', ''));
                    // blueTrace.marker.hovertext.push(type === 'drug' ? d.gene_name : d.drug_name);
                }
            }
        });
        console.log(greenTrace, blueTrace);

        this.setState({
            data: [greenTrace, blueTrace],
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
