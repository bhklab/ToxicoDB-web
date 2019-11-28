import * as d3 from 'd3';
import React from 'react';
import colors from "../../styles/colors";


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
        formattedData.pvals = data.map((x) => x.p_value == 0 ? null : -Math.log10(x.p_value));
        formattedData.fchanges = data.map((x) => x.fold_change);
        formattedData.fdr = data.map((x) => x.fdr);
        formattedData.rawData = data;
        return formattedData;
    }

    plotVolcano(data, plotId) {
        // positions and dimensions
        const margin = {
            top: 20,
            right: 250,
            bottom: 90,
            left: 100,
        };

        const width = 870;
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
            .domain([Math.min(...data.fchanges),Math.max(...data.fchanges)])
            .range([0, width]);

        const yrange = d3.scaleLinear()
            .domain([Math.min(...data.pvals),Math.max(...data.pvals)])
            .range([height, 0])
            .nice();

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
            .attr("transform", "translate("+ -90 +","+(height/2)+")rotate(-90)")
            .text("-log10(pvalue)");

        // X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("fill","black")
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
                            return colors.blue_header;
                        } else if (d.fdr < 0.05) {  
                            return colors.red_highlight;
                        } else {
                            return "#acacac";
                        }
                    })
                    .attr("cx", function(d) {return xrange(d.fold_change);})
                    .attr("cy", function(d) {return yrange(d.p_value == 0 ? 0 : -Math.log10(d.p_value));})
                    // .on("mouseover", (d) => {
                    //     console.log(d.p_value)
                    // })


        // legend
        let legend = svg.append("g")

        legend.append("rect")
            .attr("x", width + 40)
            .attr("y", 50)
            .attr("width", 12)
            .attr("height",12)
            .attr("fill", "#acacac")

            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 61)
                .attr("fill", "black")
                .text("-0.5 < fold change < 0.5")

        legend.append("rect")
            .attr("x", width + 40)
            .attr("y", 80)
            .attr("width", 12)
            .attr("height",12)
            .attr("fill", colors.blue_header)

            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 91)
                .attr("fill", "black")
                .text("fold change > 0.5,")
                
            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 108)
                .attr("fill", "black")
                .text("fold change < 0.5")

        legend.append("rect")
            .attr("x", width + 40)
            .attr("y", 120)
            .attr("width", 12)
            .attr("height",12)
            .attr("fill", colors.red_highlight)
    
            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 131)
                .attr("fill", "black")
                .text("fdr < 0.05")

    }

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Volcano;
