/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnnotationCard = styled.div`
    width: 100%;
    background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    
    a {
        color: ${colors.red_highlight};
    }
    table {
        width:100%;
        
    }
    td {
        padding: 10px;
        border: 3px solid white;
    }
    .name {
        text-transform:uppercase;
    }
    .value {
    }
    
`;


class AnnotationCard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({ data });
    }

    createCard() {
        const { data } = this.props;
        const table = [];

        for (let j = 0; j < data.length; j++) {
            if (data[j].value) {
                table.push(
                    <tr key={j}>
                        <td className="name" key={data[j].name} style={{ fontWeight: '600' }}>
                            { data[j].name.replace('_', ' ') === 'name' ? (
                                'Gene Cards'
                            ) : data[j].name.replace('_', ' ') }
                        </td>
                        <td className="value" key={data[j].value}>
                            { data[j].name === 'name'
                                ? (
                                    <a href={`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${data[j].value}`} target="_blank" className="value" key={data[j].value} style={{ color: `${colors.red_highlight}` }}>
                                        {` ${data[j].value}`}
                                    </a>
                                )
                                : data[j].value }
                        </td>
                    </tr>,
                );
            }
        }

        return table;
    }

    render() {
        const { data } = this.state;
        return (
            <StyledAnnotationCard>
                {data.length === 0 ? null
                    : (
                        <table>
                            <tbody>
                                {this.createCard()}
                            </tbody>
                        </table>
                    )}
            </StyledAnnotationCard>

        );
    }
}


export default AnnotationCard;
