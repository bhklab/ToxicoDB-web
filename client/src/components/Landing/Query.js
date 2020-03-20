import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';


const StyledQuery = styled.div`
    text-align: center !important;
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: space-between;

    h2, a {
        color: ${colors.blue_header};
        height: 60px;
        &:hover {
            color: ${colors.red_highlight}
        }
    }
    .desc {
        background:${colors.lightblue_bg};
        text-align:left;
        color: ${colors.blue_text};
        padding: 15px;
        line-height:30px;
        min-height: 80px;
        border-radius:20px;
        margin: 0px 10px;
    }
`;


class Query extends Component {
    constructor() {
        super();
        this.state = {
            queryDesc: '',
        };
    }

    componentDidMount() {
        const {
            queryName, type,
        } = this.props;

        // getting the description from pubchem
        if (type === 'pair') {
            this.setState({ queryDesc: 'compound-gene pair' });
        } else {
            this.setState({ queryDesc: '' });
        }
    }

    render() {
        const { queryName, queryUrl, desc } = this.props;
        // const { queryDesc } = this.state;
        return (
            <StyledQuery>
                <h2><Link to={`${queryUrl}`}>{queryName}</Link></h2>
                <div className="desc">
                    {/* {queryDesc} */}
                    {desc}
                </div>
            </StyledQuery>
        );
    }
}

export default Query;
