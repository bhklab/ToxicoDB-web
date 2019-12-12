import * as d3 from 'd3';
import React from 'react';
import colors from "../../styles/colors";


class Volcano extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            data, plotId, type
        } = this.props;
        const formattedData = this.formatData(data);
        this.plotVolcano(formattedData, plotId, type);
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

    plotVolcano(data, plotId, type) {
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
                    .attr("class", (d,i) => {
                        if (type == "drug") {
                            return d.gene_name.replace(" ", "") + "-dot" + i
                        } else {
                            return d.drug_name.replace(" ", "") + "-dot" + i
                        }
                    })
                    .attr("fill", (d) => {
                        let color = "";
                        if (d.fdr < 0.05 && Math.abs(d.fold_change) < 1) {  
                            color = colors.red_highlight;
                        }
                        if (d.fdr < 0.05 && Math.abs(d.fold_change) > 1) {
                            color = "#5cc33c";
                        } 
                        if (d.fdr > 0.05 && Math.abs(d.fold_change) > 1 ) {
                            color = colors.blue_header;
                        } 
                        if (d.fdr > 0.05 && Math.abs(d.fold_change) < 1) {
                            color = "#acacac";
                        }
                        return color;
                    })
                    .attr("cx", function(d) {return xrange(d.fold_change);})
                    .attr("cy", function(d) {return yrange(d.p_value == 0 ? 0 : -Math.log10(d.p_value));})
                    .style("cursor", "pointer")
                    .on("mouseover", (d,i) => {
                        if (type == "drug") {
                            d3.select(`.${d.gene_name.replace(" ", "")}${i}`).style("opacity",1)
                        } else {
                            d3.select(`.${d.drug_name.replace(" ", "")}${i}`).style("opacity",1)
                        }
                    })
                    .on("mouseout", (d,i) => {
                        if (type == "drug") {
                            d3.select(`.${d.gene_name.replace(" ", "")}${i}`).style("opacity",0)
                        } else {
                            d3.select(`.${d.drug_name.replace(" ", "")}${i}`).style("opacity",0)
                        }

                    })

        let dotLabels = svg.append("g")
            .selectAll("label")
                .data(data.rawData)
                .enter()
            .append("text")
                .attr("dx", width + 40)
                .attr("y", height - 100)
                .attr("fill", "black")
                .style("opacity", 0)
                .attr("class", (d,i) => {
                    if (type == "drug") {
                        return d.gene_name.replace(" ", "") + i
                    } else {
                        return d.drug_name.replace(" ", "") + i
                    }
                })
                .text((d) => {
                    if (type == "drug") {
                        return d.gene_name
                    } else{
                        return d.drug_name
                    }
                })


        // summary stats
        let stats = svg.append('g')
        
        stats.append('text')
            .attr('x', width)
            .attr('y', 20)
            .attr('fill', 'black')
            .text('Last time point: 24 hrs')

        stats.append('text')
            .attr('x', width)
            .attr('y', 40)
            .attr('fill', 'black')
            .text('Max dose: High')

        // legend
        let legend = svg.append("g")
                .attr('transform', 'translate(0,30)')

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
                .text("-1 < fold change < 1")

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
                .text("fold change > -1,")
                
            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 108)
                .attr("fill", "black")
                .text("fold change < 1")

        legend.append("rect")
            .attr("x", width + 40)
            .attr("y", 125)
            .attr("width", 12)
            .attr("height",12)
            .attr("fill", colors.red_highlight)
    
            legend.append("text")
                .attr("dx", width + 60)
                .attr("y", 136)
                .attr("fill", "black")
                .text("fdr < 0.05")

        legend.append("rect")
            .attr("x", width + 40)
            .attr("y", 155)
            .attr("width", 12)
            .attr("height",12)
            .attr("fill", "#5cc33c")
        
                legend.append("text")
                    .attr("dx", width + 60)
                    .attr("y", 166)
                    .attr("fill", "black")
                    .text("fdr < 0.05 and")

                legend.append("text")
                    .attr("dx", width + 60)
                    .attr("y", 184)
                    .attr("fill", "black")
                    .text("fold change > -1,")

                legend.append("text")
                    .attr("dx", width + 60)
                    .attr("y", 202)
                    .attr("fill", "black")
                    .text("fold change < 1")

        

    }

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Volcano;
