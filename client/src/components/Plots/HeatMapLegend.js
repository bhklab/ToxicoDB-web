/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HeatMapLegend = () => {
    const margin = {
        top: 0, right: 0, bottom: 0, left: 10,
    };
    const height = 290;
    const width = 100;

    const createSvg = (height, width, margin, selection) => {
        // make the SVG element.
        const svg = selection
            .append('svg')
            .attr('id', 'heatmap-legend')
            .attr('xmlns', 'http://wwww.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://wwww.w3.org/1999/xlink')
            .attr('height', height + margin.bottom + margin.top)
            .attr('width', width + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        return svg;
    };

    const createLegend = (svg) => {
        const defs = svg.append('defs');

        const linearGradient = defs.append('linearGradient')
            .attr('id', 'linear-gradient');

        // Vertical gradient
        linearGradient
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        // Set the color for the start (0%)
        linearGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#f46a33');

        // Set the color for the start (10%)
        // linearGradient.append('stop')
        //     .attr('offset', '25%')
        //     .attr('stop-color', '#ef8a62');

        // Set the color for the start (50%)
        linearGradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', '#f7f7f7');

        // Set the color for the end (100%)
        linearGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#67a9cf');

        // Draw the rectangle and fill with gradient
        svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 28)
            .attr('height', 129)
            .style('fill', 'url(#linear-gradient)');

        // legend value.
        const targetRect = svg.append('g')
            .attr('id', 'small_rect');

        const legendValue = ['Up', 'Down'];
        targetRect.selectAll('text')
            .data(legendValue)
            .enter()
            .append('text')
            .attr('x', 30)
            .attr('y', (d, i) => [15, 125][i])
            .text((d) => d)
            .attr('font-size', '15px')
            .style('text-anchor', 'start');
    };

    const createHeatMap = () => {
        // selecting div class element heatmap.
        const selection = d3.select('.heatmap-legend');

        // create svg component.
        const svg = createSvg(height, width, margin, selection);

        createLegend(svg, height, width);
    };

    // on component mounting calling create heatmap.
    useEffect(() => {
        createHeatMap();
    }, []);

    return (
        <div className="heatmap-legend" style={{ textAlign: 'center' }} />
    );
};

export default HeatMapLegend;
