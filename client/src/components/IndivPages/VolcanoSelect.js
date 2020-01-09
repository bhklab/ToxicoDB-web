/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import VolcanoSingle from '../Plots/VolcanoSingle';
import VolcanoPlotly from '../Plots/VolcanoPlotly';

const StyledVolcanoSelect = styled.div`
    width: 100%;
    
`;


class VolcanoSelect extends Component {
    constructor() {
        super();
        this.state = {
            fullData: [],
            data: [],
        };
    }

    componentDidMount() {
        const { data } = this.props;

        // refactoring data to be per dataset for the dataset selector
        let newData = {};
        data.forEach((x) => {
            const dname = x.dataset_name.replaceAll(' ', '');
            // if the dataset name isn't a key in newData yet
            if (newData[dname] === undefined) {
                newData[dname] = [];
            } 
            newData[dname].push(x);
        })
        this.setState({ fullData: data, data: newData });
    }

    render() {
        const { fullData, data, queryId } = this.state;
        return (
            <StyledVolcanoSelect>
                {data.length === 0 ? null : (
                    <VolcanoPlotly //Single
                        data={fullData} // data['TGGATESHumanLDH']
                        queryId={queryId}
                        plotId="volcanoPlot"
                        type="gene"
                    />
                )}
            </StyledVolcanoSelect>
        );
    }
}


export default VolcanoSelect;
