import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors'

import Search from './Landing/Search';
import About from './Landing/About';
import FrequentQueries from './Landing/FrequentQueries';

const StyledLanding = styled.div`
    width: 80vw;
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        margin-top:120px;

        &.title {
            text-align:center;
        }
    }
`;

class Landing extends Component {
    render() {
        return (
            <StyledLanding>
                <h1 className="title">Mine multiple toxicogenomic datasets.</h1>
                <Search/>

                <h1>About our database</h1>
                <About/>

                <h1>Most frequent queries</h1>
                <FrequentQueries/>
            </StyledLanding>
        )
    }
}

export default Landing;