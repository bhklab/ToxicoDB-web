import * as d3 from 'd3';
import React from 'react';


class Expression extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
        data, plotId, xRange, yRange, datasets
        } = this.props;
        console.log(data)
        this.plotExpression(data, plotId, xRange, yRange, datasets);
    }


    plotExpression(data, plotId, xRange, yRange, datasets) {
        // positions and dimensions
        const margin = {
        top: 20,
        right: 200,
        bottom: 90,
        left: 70,
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
            .domain(xRange)
            .range([0, width]);

        const yrange = d3.scaleLinear()
            .domain(yRange)
            .range([height, 0]);

        // set axes for graph
        const xAxis = d3.axisBottom()
            .scale(xrange)
            .tickPadding(2);

        const yAxis = d3.axisLeft()
            .scale(yrange)
            .tickSize(5);

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
            .attr("transform", "translate("+ -40 +","+(height/2)+")rotate(-90)")
            .text("Expression");

        // X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("fill","black")
            .attr("font-family", "Arial")
            .attr("transform", "translate("+ (width/2) +","+(height+50)+")")
            .text("Time");
        
        // line function
        const line = d3.line()
            .x(d => xrange(d.time))
            .y(d => yrange(d.exp));

        let legend = svg.append("g")

        data.forEach((t,i) => {
            // make lines
            svg.append("path")
                .attr("class", t.class)
                .attr("d", line(t.points))
                .attr("fill", "none")
                .attr("stroke", t.color)
                .style("opacity", 1)
                .attr("stroke-width", 4)
                .attr("stroke-dasharray", () => {
                    if (t.mode == "solid") return "";
                    else return t.mode;
                })

            // make dots
            let dots = svg.selectAll("dot")
                .data(t.points)
                .enter();

                // add dots for those that are below 100 for response
                dots.append("circle")
                    .attr("r", 4)
                    .style("opacity", 1)
                    .attr("fill", t.color)
                    .attr("cx", function(d) {return xrange(d.time);})
                    .attr("cy", function(d) {return yrange(d.exp);})

            // legend
            legend.append("line")
                .attr("class", `${t.class} legLine`)
                .attr("x1", width + 10)
                .attr("y1", 50 + (i*20))
                .attr("x2", width + 45)
                .attr("y2", 50 + (i*20))
                .attr("fill", "none")
                .attr("stroke", t.color)
                .style("opacity", 1)
                .attr("stroke-width", 4)
                .attr("stroke-dasharray", () => {
                    if (t.mode == "solid") return "";
                    else return t.mode;
                })

            legend.append("text")
                .attr("class", `${t.class} legLabel`)
                .attr("fill", "black")
                .style("font-size", 13)
                .attr("font-family", "Arial")
                .attr("x", width + 50)
                .attr("y", 55 + (i*20))
                .text(t.label)
        })

        
        



    }
  

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Expression;
