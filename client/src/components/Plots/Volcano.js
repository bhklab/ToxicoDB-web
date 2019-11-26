import * as d3 from 'd3';
import React from 'react';


class Volcano extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            data, plotId
        } = this.props;
        const formattedData = this.formatData(data);
        this.plotVolcano(formattedData, plotId);
    }

    formatData(data) {
        let formattedData = {};
        // -log10 pvalue, fold_change is already log2
        formattedData.pvals = data.map((x) => x.p_value);
        formattedData.fchanges = data.map((x) => x.fold_change);
        formattedData.fdr = data.map((x) => x.fdr);
        formattedData.rawData = data;
        return formattedData;
    }

    plotVolcano(data, plotId) {
        console.log(data)
        // positions and dimensions
        const margin = {
            top: 20,
            right: 200,
            bottom: 90,
            left: 120,
        };

        const width = 1000;
        const height = 500;

        // Add the svg canvas
        const svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                `translate(${margin.left},${margin.top})`);

        // set range for data by domain, and scale by range
        const xrange = d3.scaleLinear()
            .domain([d3.min(data.fchanges),d3.max(data.fchanges)])
            .range([0, width]);

        const yrange = d3.scaleLinear()
            .domain([d3.min(data.pvals),d3.max(data.pvals)])
            .range([height, 0]);

        console.log([d3.min(data.pvals),d3.max(data.pvals)])
        // set axes for graph
        const xAxis = d3.axisBottom()
            .scale(xrange)
            .tickPadding(2);

        const yAxis = d3.axisLeft()
            .scale(yrange)
            .tickSize(5)
            .tickFormat(d3.format(".0e"));

        // Add the Y Axis
        svg.append('g')
            .attr('class', 'y axis')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .call(yAxis)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 15)
            .attr('stroke', 'none');

        svg.selectAll('.tick')
            .select('text')
            .attr('fill', 'black')
            .attr('stroke', 'none');

        // Add the X Axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .call(xAxis)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 14)
            .attr('stroke', 'none');

        // Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("fill","black")
            .attr("font-family", "Arial")
            .attr("transform", "translate("+ -90 +","+(height/2)+")rotate(-90)")
            .text("pvalue");

        // X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("fill","black")
            .attr("font-family", "Arial")
            .attr("transform", "translate("+ (width/2) +","+(height+50)+")")
            .text("log2(fold change)");

        let dots = svg.append("g")

        dots.selectAll("dot")
            .data(data.rawData)
            .enter()
                .append("circle")
                .attr("r", 4)
                    .attr("opacity", 1)
                    .attr("fill", (d) => {
                        if (d.fold_change< -0.5 || d.fold_change > 0.5) {
                            return "blue";
                        } else if (d.fdr > 0.05) {
                            return "red";
                        } else {
                            return "gray";
                        }
                    })
                    .attr("cx", function(d) {return xrange(d.fold_change);})
                    .attr("cy", function(d) {return yrange(d.p_value);})
    }

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Volcano;
