/* eslint-disable no-nested-ternary */
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

        // this will create subelements for the table row with more than one variable.
        const createSubCard = (val) => {
            const tablerow = [];
            if (val.name === 'DataType') {
                Object.keys(val.value).forEach((id) => tablerow.push(
                    <div key={val.value[id]} style={{ padding: 3 }}>
                        <span style={{ fontWeight: '500' }}>
                            {id.replace(/_/g, ' ')}
                        </span>
                        <span>
                            {` : ${val.value[id]}`}
                        </span>
                    </div>,
                ));
            } else {
                Object.keys(val.value).forEach((id) => tablerow.push(
                    <div key={val.value[id]} style={{ padding: 2 }}>
                        <a href={`${val.value[id]}`} target="_blank" className="value" style={{ color: `${colors.red_highlight}` }}>
                            {id.replace(/_/g, ' ')}
                        </a>
                    </div>,
                ));
            }
            return tablerow;
        };

        for (let j = 0; j < data.length; j++) {
            if (data[j].value || data[j].name === 'class_in_vitro' || data[j].name === 'class_in_vivo' || data[j].name === 'carcinogenicity') {
                table.push(
                    <tr key={j}>
                        <td className="name" key={data[j].name} style={{ fontWeight: '600' }}>
                            { data[j].name.replace(/_/g, ' ') === 'name' ? (
                                'Gene Cards'
                            ) : data[j].name.replace(/_/g, ' ') }
                        </td>
                        <td className="value" key={data[j].value}>
                            { data[j].name === 'name'
                                ? (
                                    <a href={`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${data[j].value}`} target="_blank" className="value" key={data[j].value} style={{ color: `${colors.red_highlight}` }}>
                                        {` ${data[j].value}`}
                                    </a>
                                )
                                : (
                                    // (Object.keys(data[j].value).forEach((val) => console.log(val, data[j].value[val])))
                                    // {`${id}: ${val.value[id]}`}
                                    typeof (data[j].value) === 'object' ? (
                                        createSubCard(data[j])
                                    ) : data[j].value
                                ) }
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
