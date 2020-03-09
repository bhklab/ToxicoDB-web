/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HeatMap = (props) => {
    // destructuring data, pathways and drugs from props.
    const { data } = props;
    const { pathways } = data;
    const { drugs } = data;
    const { data: dataset } = data;
    const dimension = { rectHeight: 12, rectWidth: 12 };
    const margin = {
        top: 300, right: 150, bottom: 100, left: 500,
    };
    const height = dimension.rectHeight * pathways.length;
    const width = dimension.rectWidth * drugs.length;
    const { min } = data;
    const { max } = data;

    const createSvg = (height, width, margin, selection) => {
        // make the SVG element.
        const svg = selection
            .append('svg')
            .attr('id', 'heatmap-pathways')
            .attr('xmlns', 'http://wwww.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://wwww.w3.org/1999/xlink')
            .attr('height', height + margin.bottom + margin.top)
            .attr('width', width + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        return svg;
    };

    const createAxis = (drugs, pathways, skeleton, width, height) => {
        // defining the scale that we will use for
        // our x-axis and y-axis for the skeleton.;
        const yScale = d3.scaleBand()
            .domain(pathways)
            .rangeRound([height, pathways.length * height + height]);

        const xScale = d3.scaleBand()
            .domain(drugs)
            .rangeRound([0, drugs.length * width + 2]);

        // defining the x-axis for the main skeleton and
        // setting tick size to zero will remove the ticks.
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .tickSize(0)
            .tickPadding(15);

        const xAxis = d3.axisTop()
            .scale(xScale)
            .tickSize(0);

        // calling axis for drugname and pathwayname.
        const drugName = skeleton.append('g')
            .attr('class', 'drugName');

        drugName.attr('stroke-width', '0')
            .style('font-family', '\'Raleway\',sans-serif')
            .style('font-size', '10px')
            .attr('font-weight', '500')
            .style('text-anchor', 'start')
            .call(xAxis)
            .selectAll('text')
            .attr('transform', 'rotate(-90)');

        const pathwayName = skeleton.append('g')
            .attr('class', 'pathwayName');

        pathwayName.attr('stroke-width', '0')
            .style('font-family', '\'Raleway\',sans-serif')
            .style('font-size', '10px')
            .attr('font-weight', '500')
            .call(yAxis)
            .selectAll('text');
    };


    const createRectangle = (drugs, pathways, skeleton, width, height, data, min, max) => {
        // color scaling for rectangles
        const linearColorScale = d3.scaleLinear()
            .domain([min, 0, max])
            .range(['#e0f3db', '#a8ddb5', '#43a2ca']);

        // creating and coloring rectangles.
        for (let i = 0; i < drugs.length; i++) {
            for (let j = 0; j < pathways.length; j++) {
                let value = 0;
                let opacity = 1;

                if (data[drugs[i]][pathways[j]].stat_dis) {
                    value = data[drugs[i]][pathways[j]].stat_dis;
                }

                if (data[drugs[i]][pathways[j]].fdr > 0.05) {
                    opacity = 0.2;
                }

                skeleton.append('rect')
                    .attr('x', i * width)
                    .attr('y', j * height + height)
                    .attr('height', height - 2)
                    .attr('width', width - 2)
                    .attr('fill', linearColorScale(value))
                    .attr('opacity', opacity);
            }
        }
    };

    const createHeatMap = () => {
        // selecting div class element heatmap.
        const selection = d3.select('.heatmap');
        // create svg component.
        const svg = createSvg(height, width, margin, selection);
        // create a basic skeleton.
        const skeleton = svg.append('g')
            .attr('class', 'skeleton');
        // create scale and axis for drug names and pathway names.
        createAxis(drugs, pathways, skeleton, dimension.rectWidth, dimension.rectHeight);
        // create rectangles for heatmap.
        createRectangle(drugs, pathways, skeleton, dimension.rectWidth, dimension.rectHeight, dataset, min, max);
    };

    // on component mounting calling create heatmap.
    useEffect(() => {
        createHeatMap();
    }, []);

    return (
        <div className="heatmap" />
    );
};

export default HeatMap;
