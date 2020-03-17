/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HeatMapLegend = (props) => {
    // destructuring data, pathways and drugs from props.
    const { data } = props;
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
        top: 0, right: 0, bottom: 0, left: 370,
    };
    const height = dimension.rectHeight * pathways.length;
    const width = 0;
    const { min } = data;
    const { max } = data;
    const { mean } = data;


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

    const createAxis = (pathways, svg, width, height) => {
        // defining the scale
        const yScale = d3.scaleBand()
            .domain(pathways)
            .rangeRound([height, pathways.length * height + height]);

        // defining the x-axis for the main svg and
        // setting tick size to zero will remove the ticks.
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .tickSize(0)
            .tickPadding(15);

        const pathwayName = svg.append('g')
            .attr('class', 'pathwayName');

        pathwayName.attr('stroke-width', '0')
            .style('font-family', '\'Raleway\',sans-serif')
            .style('font-size', '8px')
            .attr('font-weight', '500')
            .style('text-anchor', 'end')
            .call(yAxis)
            .selectAll('text');
    };

    const createHeatMap = () => {
        // selecting div class element heatmap.
        const selection = d3.select('.heatmap-legend-pathways');
       
        // create svg component.
        const svg = createSvg(height, width, margin, selection);

        // create scale and axis for drug names and pathway names.
        createAxis(pathways, svg, dimension.rectWidth, dimension.rectHeight);
    };

    // on component mounting calling create heatmap.
    useEffect(() => {
        createHeatMap();
    }, [data]);

    return (
        <div className="heatmap-legend-pathways" style={{ textAlign: 'center' }} />
    );
};

export default HeatMapLegend;
