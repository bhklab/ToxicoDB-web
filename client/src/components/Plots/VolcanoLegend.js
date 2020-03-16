import * as d3 from 'd3';
import React from 'react';

class VolcanoLegend extends React.Component {
    componentDidMount() {
        const {plotId} = this.props;
        const width = 800;
        const height = 20;
        const margin = {
            top: 10,
            left: 0,
            bottom: 0,
            right: 0
        }

        const svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                `translate(${margin.left},${margin.top})`);

        let legend = svg.append("g")

            legend.append("circle")
                .attr("cx", 20)
                .attr("cy", 6)
                .attr("r", 5)
                .attr("fill", '#e1f1fb')

                legend.append("text")
                    .attr("dx", 30)
                    .attr("y", 10)
                    .attr("fill", "black")
                    .style('font-family', 'Arial')
                    .style('font-size', 12)
                    .text("FDR < 0.05 and |log2(fold change)| < 1")

            legend.append("circle")
                .attr("cx", 265)
                .attr("cy", 6)
                .attr("r", 5)
                .attr("fill", '#5cc33c') //#5cc33c

                legend.append("text")
                    .attr("dx", 276)
                    .attr("y", 10)
                    .style('font-family', 'Arial')
                    .style('font-size', 12)
                    .attr("fill", "black")
                    .text("FDR < 0.05 and |log2(fold change)| >= 1")


            // last time point etc
            legend.append("text")
                .attr("dx", 526)
                .attr("y", 10)
                .style('font-family', 'Arial')
                .style('font-size', 12)
                .attr("fill", "black")
                .text("Last time point: 24 hrs")

            legend.append("text")
                .attr("dx", 710)
                .attr("y", 10)
                .style('font-family', 'Arial')
                .style('font-size', 12)
                .attr("fill", "black")
                .text("Max dose: High")

            // legend.append("circle")
            //     .attr("x", 500)
            //     .attr("y", 0)
            //     .attr("width", 12)
            //     .attr("height",12)
            //     .attr("fill", 'lightgray')
    
            //         legend.append("text")
            //             .attr("dx", 516)
            //             .attr("y", 10)
            //             .style('font-family', 'Arial')
            //             .style('font-size', 12)
            //             .attr("fill", "black")
            //             .text("FDR >= 0.05 and |fold change| < 1")
    

    }
    render() {
        return <div id={this.props.plotId}/>;
    }
}

export default VolcanoLegend;