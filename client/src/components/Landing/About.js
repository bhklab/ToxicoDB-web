import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Bubble from '../Plots/Bubble';

const StyledAbout = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding:0px;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    height:auto;
`;

const StyledDescription = styled.div`
    background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    font-family: 'Raleway', sans-serif;
    font-size: calc(0.8em + 0.5vw);
    line-height:calc(10px + 2.5vw);
    padding:30px 50px 50px 30px;
    border-radius:15px;
    width:45%;
    float:left;
    margin-right:3%;
    
`;

const StyledChart = styled.div`
    // background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    font-family: 'Raleway', sans-serif;
    font-size: calc(1em + 0.3vw);
    line-height:0px;
    padding:20px;
    border-radius:15px;
    width:47%;
    float:right;
`;


const About = () => {
    const stats = [
        {
            text: 'Datasets', count: '3', size: 2, groupid: 1, id: 1,
        },
        {
            text: 'Cells', count: '1', size: 1, groupid: 2, id: 2,
        },
        {
            text: 'Species', count: '2', size: 2, groupid: 3, id: 3,
        },
        {
            text: 'Drugs', count: '234', size: 4, groupid: 4, id: 4,
        },
        {
            text: 'Tissues', count: '1', size: 1, groupid: 5, id: 5,
        },
        {
            text: 'Genes', count: '32K', size: 7, groupid: 6, id: 6,
        },
    ];
    return (
        <StyledAbout>
            <StyledDescription>
                <span style={{ fontWeight: 600, color: colors.red_highlight }}>ToxicoDB</span>
                {' '}
                is a database of curated toxicogenomics datasets that provides convenient
                data summary and visualization to mine these complex data.
                Users can find drug and gene annotations,
                visualize gene expression within datasets as well
                as differential gene expression for
                drug of interest with the option to download the data.
            </StyledDescription>
            {/* put the plot here in a diff component */}
            <StyledChart>
                <Bubble
                    data={stats}
                    plotId="bubbleChart"
                />
            </StyledChart>
        </StyledAbout>
    );
};

export default About;
