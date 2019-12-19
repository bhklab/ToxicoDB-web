import React from 'react';
import Plot from 'react-plotly.js';
import colors from "../../styles/colors";


class VolcanoPlotly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            data: null,
            loading: true,
            displayPlot: true,
        }
    }

    componentDidMount() {
        const {
            data, queryId, plotId, type
        } = this.props;
        const formattedData = this.formatData(data);

    }

    formatData(data) {
        const {type} = this.props;
        // setting up the traces; can't really deep copy
        let green_trace = {};
            green_trace.type = 'scatter';
            green_trace.mode = 'markers';
            green_trace.x = [];
            green_trace.y = [];
            green_trace.ids = [];
            green_trace.marker = {};
            green_trace.marker.hoverinfo = 'text';
            green_trace.marker.hovertext = [];
            green_trace.marker.color = '#5cc33c';
            green_trace.name = 'fdr < 0.05, fold change >= |1|';

        let blue_trace = {};
            blue_trace.type = 'scatter';
            blue_trace.mode = 'markers';
            blue_trace.x = [];
            blue_trace.y = [];
            blue_trace.ids = [];
            blue_trace.marker = {};
            // blue_trace.marker.hoverinfo = 'text';
            // blue_trace.marker.hovertext = [];
            blue_trace.marker.color = '#4c84b1';
            blue_trace.name = 'fdr < 0.05, fold change < |1|';

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value)).filter((x) => x !== null)))

        // putting data in
        data.forEach( (d,i) => {
            if (parseFloat(d.fdr) < 0.05 && d.fold_change >= Math.abs(1)) {
                green_trace.x.push(d.fold_change);
                green_trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                green_trace.ids.push(d.dataset_name.replaceAll(' ', ''));
                // green_trace.marker.hovertext.push(type === 'drug' ? d.gene_name : d.drug_name);
            } else if (parseFloat(d.fdr) < 0.05 && d.fold_change < Math.abs(1)) {
                blue_trace.x.push(d.fold_change);
                blue_trace.y.push(parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                blue_trace.ids.push(d.dataset_name.replaceAll(' ', ''));
                // blue_trace.marker.hovertext.push(type === 'drug' ? d.gene_name : d.drug_name);
            }
        })
        console.log(green_trace, blue_trace)

        this.setState({
            data: [green_trace, blue_trace],
            layout: {
                height: 450,
                width:800,
                paper_bgcolor: 'white',
                plot_bgcolor: 'white',
                orientation: 'v',
                yaxis: { ticklen: 0, title: '-log10(p value)'},
                xaxis: { title: '-log2(fold change)', zeroline: false},
                hovermode: 'closest',
                font: {
                  size: 12,
                  color: colors.nav_links,
                  family: 'Arial',
                },
              },
        })
    }

    render() {
        const {layout, data} = this.state;
        const {plotId} = this.props;
        return (
            <Plot 
                data={data}
                layout={layout}
                graphDiv={plotId}
                config={{responsive:true}}
            />
        )
    }
}

export default VolcanoPlotly;
