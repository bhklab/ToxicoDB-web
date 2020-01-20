import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

import Search from './Landing/Search';
import About from './Landing/About';
import FrequentQueries from './Landing/FrequentQueries';
import Collaboration from './Landing/Collaboration';

const StyledLanding = styled.div`
    width: 80vw;
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);

        &.title {
            text-align:center;
        }
    }
    
`;

const Landing = () => (
    <StyledLanding>
        <h1 style={{ marginTop: '200px' }} className="title">Mine multiple toxicogenomic datasets.</h1>
        <Search />

        <h1 style={{ marginTop: '90px', marginBottom: '10px' }}>About our database</h1>
        <About />

        <h1 style={{ marginTop: '50px' }}>Most frequent queries</h1>
        <FrequentQueries />

        <Collaboration />
    </StyledLanding>
);

export default Landing;
