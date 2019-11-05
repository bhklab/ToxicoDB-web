import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors'
import { callbackify } from 'util';
import Bubble from '../Plots/Bubble';

const StyledAbout = styled.div`
    margin-top:35px;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`;

const StyledDescription = styled.div`
    background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    font-family: 'Raleway', sans-serif;
    font-size: calc(1em + 0.3vw);
    line-height:50px;
    padding:20px;
    border-radius:15px;
    width:45%;
    float:left;
    margin-right:5%;
`;

const StyledPlaceholder = styled.div`
    // background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    font-family: 'Raleway', sans-serif;
    font-size: calc(1em + 0.3vw);
    line-height:50px;
    padding:20px;
    border-radius:15px;
    width:45%;
    float:right;
`;


class About extends Component {
    render() {
        const stats = [
            { label: 'Datasets', value: 2 },
            { label: 'Cell Type', value: 1 },
            { label: 'Model Systems', value: 2 },
            { label: 'Drugs', value: 10 },
            { label: 'Tissue', value: 1 },
            { label: 'Genes', value: 22 },
        ]
        return (
            <StyledAbout>
                <StyledDescription>
                ToxicoDB is a database of curated toxicogenomics datasets that provides convenient 
                data summary and visualization to mine these complex data. Users can find drug and gene annotations, 
                visualize gene expression within datasets as well as differential gene expression for 
                drug of interest with the option to download the data.
                </StyledDescription>
                {/* put the plot here in a diff component */}
                <StyledPlaceholder>
                    <Bubble
                        data={stats}
                        plotId="bubbleChart"
                    />
                </StyledPlaceholder>
            </StyledAbout>
        )
    }
}

export default About;