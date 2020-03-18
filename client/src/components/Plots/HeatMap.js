/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HeatMap = (props) => {
    // destructuring data, pathways and drugs from props.
    const { data, widthCallback } = props;
    const { pathways } = data;
    const { isGroup } = data;
    const { drugs: drugObject } = data;
    const drugs = [];
    Object.keys(drugObject).forEach((val) => {
        if (isGroup.length > 0 && drugObject[val].carcinogenicity === 'C' && isGroup.includes('carcinogenicity')) {
            drugs.push(val);
        } else if (isGroup.length > 0 && drugObject[val].carcinogenicity === 'NC' && isGroup.includes('carcinogenicity')) {
            drugs.unshift(val);
        } else if (isGroup.length > 0 && drugObject[val].class_in_vivo === 'GTX' && isGroup.includes('class_in_vivo')) {
            drugs.push(val);
        } else if (isGroup.length > 0 && drugObject[val].class_in_vivo === 'NGTX' && isGroup.includes('class_in_vivo')) {
            drugs.unshift(val);
        } else {
            drugs.push(val);
        }
    });
    const { data: dataset } = data;
    const dimension = { rectHeight: 14, rectWidth: 14 };
    const margin = {
        top: 200, right: 10, bottom: 100, left: 0,
    };
    const height = dimension.rectHeight * pathways.length;
    const width = dimension.rectWidth * drugs.length;
    const { min } = data;
    const { max } = data;
    const { mean } = data;

    widthCallback(width);

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
        // const yScale = d3.scaleBand()
        //     .domain(pathways)
        //     .rangeRound([height, pathways.length * height + height]);

        const xScale = d3.scaleBand()
            .domain(drugs)
            .rangeRound([0, drugs.length * width + 2]);

        // defining the x-axis for the main skeleton and
        // setting tick size to zero will remove the ticks.
        // const yAxis = d3.axisLeft()
        //     .scale(yScale)
        //     .tickSize(0)
        //     .tickPadding(15);

        const xAxis = d3.axisTop()
            .scale(xScale)
            .tickSize(0);

        // calling axis for drugname and pathwayname.
        const drugName = skeleton.append('g')
            .attr('class', 'drugName');

        drugName.attr('stroke-width', '0')
            .style('font-family', '\'Raleway\',sans-serif')
            .style('font-size', '8px')
            .attr('font-weight', '500')
            .style('text-anchor', 'start')
            .call(xAxis)
            .selectAll('text')
            .attr('transform', 'rotate(-75)')
            .attr('color', (i) => {
                let color = 'black';

                if (isGroup.length > 0 && data.drugs[i].carcinogenicity === 'C' && isGroup.includes('carcinogenicity')) {
                    color = 'red';
                } else if (isGroup.length > 0 && data.drugs[i].carcinogenicity === 'NC' && isGroup.includes('carcinogenicity')) {
                    color = 'green';
                } else if (isGroup.length > 0 && data.drugs[i].class_in_vivo === 'GTX' && isGroup.includes('class_in_vivo')) {
                    color = 'red';
                } else if (isGroup.length > 0 && data.drugs[i].class_in_vivo === 'NGTX' && isGroup.includes('class_in_vivo')) {
                    color = 'green';
                } else {
                    color = 'black';
                }

                return color;
            });

        // const pathwayName = skeleton.append('g')
        //     .attr('class', 'pathwayName');

        // pathwayName.attr('stroke-width', '0')
        //     .style('font-family', '\'Raleway\',sans-serif')
        //     .style('font-size', '8px')
        //     .attr('font-weight', '500')
        //     .style('text-anchor', 'end')
        //     .call(yAxis)
        //     .selectAll('text');
    };


    const createRectangle = (drugs, pathways, skeleton, width, height, data, min, max, mean) => {
        console.log(min, mean, max);
        // color scaling for rectangles
        // const linearColorScale = d3.scaleLinear()
        //     .domain([min, 0, mean, max])
        //     .range(['#67a9cf', '#f7f7f7', '#ef8a62', '#8a2904']);

        const linearColorScale = d3.scaleLinear()
            .domain([min, 0, max])
            .range(['#67a9cf', '#f7f7f7', '#f46a33']);


        // creating and coloring rectangles.
        for (let i = 0; i < drugs.length; i++) {
            for (let j = 0; j < pathways.length; j++) {
                let value = 0;
                let opacity = 1;

                if (data[drugs[i]][pathways[j]].stat_dis) {
                    value = data[drugs[i]][pathways[j]].stat_dis;
                }

                if (data[drugs[i]][pathways[j]].fdr > 0.05) {
                    opacity = 0.0;
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

    // const createLegend = (skeleton) => {
    //     const defs = skeleton.append('defs');

    //     const linearGradient = defs.append('linearGradient')
    //         .attr('id', 'linear-gradient');

    //     // Vertical gradient
    //     linearGradient
    //         .attr('x1', '0%')
    //         .attr('y1', '0%')
    //         .attr('x2', '0%')
    //         .attr('y2', '100%');

    //     // Set the color for the start (0%)
    //     linearGradient.append('stop')
    //         .attr('offset', '0%')
    //         .attr('stop-color', '#ef8a62');

    //     // Set the color for the start (50%)
    //     linearGradient.append('stop')
    //         .attr('offset', '50%')
    //         .attr('stop-color', '#f7f7f7');

    //     // Set the color for the end (100%)
    //     linearGradient.append('stop')
    //         .attr('offset', '100%')
    //         .attr('stop-color', '#67a9cf');

    //     // Draw the rectangle and fill with gradient
    //     skeleton.append('rect')
    //         .attr('x', width + 50)
    //         .attr('y', height / 2)
    //         .attr('width', 28)
    //         .attr('height', 89)
    //         .style('fill', 'url(#linear-gradient)');

    //     // legend value.
    //     const targetRect = skeleton.append('g')
    //         .attr('id', 'small_rect');

    //     const legendValue = ['Up', 'Down'];
    //     targetRect.selectAll('text')
    //         .data(legendValue)
    //         .enter()
    //         .append('text')
    //         .attr('x', width + 80)
    //         .attr('y', (d, i) => height / 2 + 88 * i + 10)
    //         .text((d) => d)
    //         .attr('font-size', '14px')
    //         .style('text-anchor', 'start');
    // };

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
        createRectangle(drugs, pathways, skeleton, dimension.rectWidth, dimension.rectHeight, dataset, min, max, mean);
        // create legend.
        // createLegend(skeleton, height, width);
    };

    // on component mounting calling create heatmap.
    useEffect(() => {
        d3.select('#heatmap-pathways').remove();
        createHeatMap();
    }, [data]);

    return (
        <div className="heatmap" />
    );
};

export default HeatMap;
