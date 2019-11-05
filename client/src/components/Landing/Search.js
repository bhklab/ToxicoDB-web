import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors'

const StyledSearch = styled.div`
    input {
        margin-top:50px;
        height:70px;
        width:calc(100% - 60px);
        background: ${colors.lightred_bg};
        border: none;
        color: ${colors.red_highlight};
        border-radius:35px;
        padding: 0px 30px;
        font-size: calc(1em + 0.8vw);
        font-family: 'Raleway', sans-serif;
        font-weight:700;

        &::placeholder {
            color: ${colors.red_highlight};
            font-weight:600;
            opacity:0.7;
        }

        &:focus {
            outline:none;
        }
    }
`;

class Search extends Component {
    render() {
        return (
            <StyledSearch>
                <input type="text" className="input" placeholder="Search..." />
            </StyledSearch>
        )
    }
}

export default Search;