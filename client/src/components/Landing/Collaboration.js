import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors'


const StyledCollaboration = styled.div`
    width:100%;
    padding:25px;
    background:${colors.lightblue_bg};
    font-weight:700;
    color: ${colors.blue_header};
    height:auto;
    border-radius:25px;
    text-align:center;
    margin:100px 0px;
    font-size:calc(0.8em + 0.5vw);

    a {
        color: ${colors.red_highlight};
    }
`;

class Collaboration extends Component {
    render() {
        return (
            <StyledCollaboration>
                The BHKLab is collaborating with <a href="https://openrisknet.org">OpenRiskNet</a> for the development of ToxicoDB.
            </StyledCollaboration>
        )
    }
}

export default Collaboration;