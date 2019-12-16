import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledDocumentation = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:20px;
    border-radius:25px;
    text-align:center;
    font-size:30px;
    color: ${colors.blue_text};
    background: ${colors.lightblue_bg};
    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1em + 1vw);
        text-align:center;
        margin-bottom:50px;
    }
    a {
      color: ${colors.blue_text}
    }
`;

class Documentation extends Component {
    render() {
        return (
            <StyledDocumentation>
        Documentation will be added soon.
            </StyledDocumentation>
        );
    }
}


export default Documentation;
