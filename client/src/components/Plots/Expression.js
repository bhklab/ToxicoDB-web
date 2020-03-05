import * as d3 from 'd3';
import React from 'react';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class Expression extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
        data, plotId, xRange, yRange, datasets
        } = this.props;

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
            

        // making the paths
        data.forEach((t,i) => {
            // make lines
            svg.append("path")
                .attr("class", `${t.class}-path`)
                .attr("d", line(t.points))
                .attr("fill", "none")
                .attr("stroke", t.color)
                .attr("opacity", 1)
                .attr("stroke-width", 4)
                .attr("stroke-dasharray", () => {
                    if (t.mode == "solid") return "";
                    else return t.mode;
                });   
        // make dots
            let dots = svg.selectAll("dot")
                .data(t.points)
                .enter();

                // add dots for those that are below 100 for response
                dots.append("circle")
                    .attr("r", 4)
                    .attr("class", `${t.class}-path`)
                    .attr("opacity", 1)
                    .attr("fill", t.color)
                    .attr("cx", function(d) {return xrange(d.time);})
                    .attr("cy", function(d) {return yrange(d.exp);})

            // to make sure it only puts a legend once
            if (t.class == datasets[0].replaceAll(' ','')) {
                // legend
                legend.append("line")
                    .attr("class", `${t.class} legLine`)
                    .attr("x1", width + 10)
                    .attr("y1", 50 + (i*21))
                    .attr("x2", width + 45)
                    .attr("y2", 50 + (i*21))
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
                    .attr("y", 55 + (i*21))
                    .text(t.label)
            }
            
        })

        // making the dataset selectors
        let nest = d3.nest()
            .key(function(d) {
                return d;
            })
            .entries(datasets);



        nest.forEach((d,i) => {
            legend.append('rect')
                .attr("x", width+10)
                .attr("y", height - 80 + (i*20))
                .attr("class", `${datasets[i].replaceAll(' ','')}-legRect`)
                .attr("width", 13)
                .attr("height", 13)
                .attr("fill", () => {
                    if (datasets[i] != datasets[0]) {
                        d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 0)
                        d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "white")
                        return 'white';
                    } else {
                        return 'black';
                    }
                })
                .style("stroke", "black")
                .style("stroke-width", 1)
                .style("cursor", "pointer")
                .on("click", () => {
                    let active   = d.active ? false : true

                    // only show first dataset first
                    if (datasets[i] != datasets[0]) {
                        //to show that this dataset has been selected
                        if (active) {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 1)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "black")
                        } else {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 0)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "white")
                        }
                    
                        d.active = active;
                    } else {
                        //to show that this dataset has been selected
                        if (active) {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 0)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "white")
                        } else {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 1)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "black")
                        }
                    
                        d.active = active;
                    }
        
                     
                })

            legend.append("text")
                .attr("class", `${datasets[i]}-legDsetLabel`)
                .attr("fill", "black")
                .style("font-size", 13)
                .attr("font-family", "Arial")
                .attr("x", width + 30)
                .attr("y", height - 69 + (i*20))
                .style("cursor", "pointer")
                .on("click", () => {
                    let active   = d.active ? false : true
        
                    // only show tggates human first
                    if (datasets[i] != datasets[0]) {
                        //to show that this dataset has been selected
                        if (active) {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 1)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "black")
                        } else {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 0)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "white")
                        }
                    
                        d.active = active;
                    } else {
                        //to show that this dataset has been selected
                        if (active) {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 0)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "white")
                        } else {
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-path`).attr("opacity", 1)
                            d3.selectAll(`.${datasets[i].replaceAll(' ','')}-legRect`).attr("fill", "black")
                        }
                    
                        d.active = active;
                    }
                })
                .text(datasets[i])
        })
        
        
        



    }
  

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Expression;
