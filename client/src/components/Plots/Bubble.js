/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';

class Bubble extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            data, plotId,
        } = this.props;
        this.plotBubble(data, plotId);
    }


    plotBubble(data, plotId) {
        const width = '100%';
        const height = 500;

        // location to centre the bubbles
        const centre = { x: 500 / 2, y: height / 2 };

        // strength to apply to the position forces
        const forceStrength = 0.03;

        // these will be set in createNodes and chart functions
        let svg = null;
        let bubbles = null;
        let labels = null;
        let nodes = [];

        // charge is dependent on size of the bubble, so bigger towards the middle
        function charge(d) {
            return Math.pow(d.radius, 2.0) * 0.01;
        }

        // create a force simulation and add forces to it
        const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(charge))
            // .force('center', d3.forceCenter(centre.x, centre.y))
            .force('x', d3.forceX().strength(forceStrength).x(centre.x))
            .force('y', d3.forceY().strength(forceStrength).y(centre.y))
            .force('collision', d3.forceCollide().radius((d) => d.radius + 1));

        // force simulation starts up automatically, which we don't want as there aren't any nodes yet
        simulation.stop();

        // set up colour scale
        const fillColour = d3.scaleOrdinal()
            .domain(['1', '2', '3', '4', '5', '6'])
            .range(['#ae022f', '#c64e6d', '#df9aac', '#177ab4', '#47a0d3', '#8cc4e4']);

        // callback function called after every tick of the force simulation
        // here we do the actual repositioning of the circles based on current x and y value of their bound node data
        // x and y values are modified by the force simulation
        function ticked() {
            bubbles
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);

            labels
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y);
        }

        // data manipulation function takes raw data from csv and converts it into an array of node objects
        // each node will store data and visualisation values to draw a bubble
        // data is expected to be an array of data objects, read in d3.csv
        // function returns the new node array, with a node for each element in the data input
        function createNodes(data) {
            // use max size in the data as the max in the scale's domain
            // note we have to ensure that size is a number
            const maxSize = d3.max(data, (d) => +d.size);

            // size bubbles based on area
            const radiusScale = d3.scaleSqrt()
                .domain([0, maxSize])
                .range([0, 80]);

            // use map() to convert raw data into node data
            const myNodes = data.map((d) => ({
                ...d,
                radius: radiusScale(+d.size) + 10,
                size: +d.size,
                x: Math.random() * 800,
                y: Math.random() * 800,
            }));

            return myNodes;
        }

        // convert raw data into nodes data
        nodes = createNodes(data);

        // create svg element inside provided selector
        svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', '0 0 500 500');

        // bind nodes data to circle elements
        const elements = svg.selectAll('.bubble')
            .data(nodes, (d) => d.id)
            .enter()
            .append('g');

        bubbles = elements.append('a')
            .attr('xlink:href', (d) => d.text.toLowerCase())
            .append('circle')
            .classed('bubble', true)
            .attr('r', (d) => d.radius)
            .attr('fill', (d) => fillColour(d.groupid))
            .attr('cursor', 'pointer');

        // labels
        labels = elements
            .append("a")
            .attr('xlink:href', (d) => d.text.toLowerCase())
            .append('text')
            .attr('dx', '13')
            .attr('dy', '-0.5em')
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('font-size', 15)
            .html((d) => {
                let t;
                let tt;
                if (d.text === 'Drugs') {
                    t = `<tspan text-anchor='middle' font-size=18 dx='0.5em' >${d.count}</tspan>`;
                    tt = `<tspan text-anchor='middle' dx='-2.1em' dy=20>${d.text}</tspan>`;
                } else if (d.text === 'Genes') {
                    t = `<tspan text-anchor='middle' font-size=18 dx='0.5em' >${d.count}</tspan>`;
                    tt = `<tspan text-anchor='middle' dx='-2.5em' dy=20>${d.text}</tspan>`;
                } else if (d.text === 'Tissue') {
                    t = `<tspan text-anchor='middle' font-size=18 dx='0.6em' >${d.count}</tspan>`;
                    tt = `<tspan text-anchor='middle' dx='-1.6em' dy=20>${d.text}</tspan>`;
                } else {
                    t = `<tspan text-anchor='middle' font-size=18  >${d.count}</tspan>`;
                    tt = `<tspan text-anchor='middle' dx='-2em' dy=20>${d.text}</tspan>`;
                }

                // var ttt = "<tspan text-anchor='middle' font-size=13 dy=15>aaaaaaaaa</tspan>";
                return t + tt;// appending it to the html
            });


        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set
        simulation.nodes(nodes)
            .on('tick', ticked)
            .restart();
    }

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default Bubble;
