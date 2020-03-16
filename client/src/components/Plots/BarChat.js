/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
import React from 'react';
import * as d3 from 'd3';


class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.BarChart = this.BarChart.bind(this);
        this.makeBarChart = this.makeBarChart.bind(this);
    }

    componentDidMount() {
        this.BarChart();
    }

    componentDidUpdate() {
        this.BarChart();
    }

    BarChart() {
        const { node } = this;
        const height = 500;
        const width = 500;
        const left = 280;
        const top = 250;
        const bottom = 300;
        const right = 100;
        this.makeBarChart(node, height, width, left, top, bottom, right);
    }

    // data should be like => {id: 'Gastric Cancer', value: 1007}
    makeBarChart(node, height, width, left, top, bottom, right) {
        const data = [
            {
                name: 'Drug_Matrix',
                value: 146,
            },
            {
                name: 'TGGATEs_Human_LDH',
                value: 140,
            },
            {
                name: 'TGGATEs_Rat_LDH',
                value: 126,
            },
        ];


        // colors array.
        // using scale ordinal to map tissues with the colors.
        const colors = ['#E64B35FF', '#4DBBD5FF', '#00A087FF', '#3C5488FF', '#F39B7FFF', '#8491B4FF', '#91D1C2FF', '#B09C85FF',
            '#0073C2FF', '#868686FF', '#CD534CFF', '#7AA6DCFF', '#003C67FF', '#3B3B3BFF', '#A73030FF', '#4A6990FF',
            '#00468BBF', '#42B540BF', '#0099B4BF', '#925E9FBF', '#FDAF91BF', '#AD002ABF', '#ADB6B6BF',
        ];

        const nameData = data.map((val) => val.name);

        const color = d3.scaleOrdinal()
            .domain(nameData)
            .range(colors);


        // passing id specific to the type.
        // const { chartId } = this.props;
        const chartId = 'tissuebar';

        //* * Setting the SVG Attributes * *//
        d3.select('svg').remove();
        // make the svg element.
        const svg = d3.select(node)
            .append('svg')
            .attr('id', `donutchart-${chartId}`)
            .attr('xmlns', 'http://wwww.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://wwww.w3.org/1999/xlink')
            .attr('height', height + top + bottom)
            .attr('width', width + left + right)
            .append('g')
            .attr('transform', `translate(${left},${top})`);

        // structure of the chart.
        const skeleton = svg.append('g')
            .attr('id', 'skeleton');

        // y and x scale for the chart.
        const yScale = d3.scaleLinear()
            .domain([0, 200])
            .range([height, 0]);

        const xScale = d3.scaleBand()
            .domain(data.map((d) => d.name))
            .range([0, width])
            .padding(0.2);

        // y and x axis for the chart.
        const yAxis = d3.axisLeft()
            .scale(yScale);

        const xAxis = d3.axisBottom()
            .scale(xScale);

        // calling y and x axis.
        skeleton.append('g')
            .attr('id', 'valueAxis')
            .call(yAxis)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 15)
            .attr('stroke', 'none');

        skeleton.append('g')
            .attr('id', 'nameAxis')
            .call(xAxis)
            .attr('transform', `translate(0, ${height})`)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 14)
            .attr('stroke', 'none');

        // making bar chart.
        skeleton.selectAll()
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 4)
            .attr('y', (d) => yScale(d.value))
            .attr('height', (d) => height - yScale(d.value))
            .attr('width', xScale.bandwidth() / 2)
            .style('fill', (d) => color(d.name));
    }

    render() {
        return (
            <div
                ref={(node) => this.node = node}
                className="barchart"
            />
        );
    }
}


export default BarChart;
