import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';


const StyledQuery = styled.div`
    text-align: center !important;
    font-family: 'Raleway', sans-serif;

    h2 {
        color: ${colors.blue_header};
        
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
            queryDesc: "",
        }
    }

    componentDidMount() {
        const {
            queryName, type
        } = this.props;
        
        // getting the description from pubchem
        if (type == "pair") {
            this.setState({queryDesc: "drug-gene pair"})
        } else {
            this.setState({queryDesc: ""})
        }
    }

    render() {
        const {queryName, type, desc} = this.props;
        const {queryDesc} = this.state;
        return (
            <StyledQuery>
                <h2>{queryName}</h2>
                <div className="desc">
                    {/* {queryDesc} */}
                    {desc}
                </div>
            </StyledQuery>
        )
    }
}

export default Query;
