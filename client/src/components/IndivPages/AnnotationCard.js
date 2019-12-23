/* eslint-disable no-shadow */
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
        const isDrugData = data.filter(val => val.name === 'pubchem')

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
                        <a href={`${val.value[id]}`} target="_blank" rel="noopener noreferrer" className="value" style={{ color: `${colors.red_highlight}` }}>
                            {id.replace(/_/g, ' ')}
                        </a>
                    </div>,
                ));
            }
            return tablerow;
        };

        // this will return link based on the input.
        const createLink = (data) => {
            // array and variable to store the result.
            const tableLink = [];
            let link = '';
            // right link based on the case.
            switch (data.name) {
            case 'name':
                link = 'http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=';
                break;
            case 'symbol':
                link = 'http://www.genecards.org/cgi-bin/carddisp.pl?gene=';
                break;
            case 'entrez_gid':
                link = 'https://www.ncbi.nlm.nih.gov/gene/?term=';
                break;
            case 'pubchem':
                link = 'https://pubchem.ncbi.nlm.nih.gov/compound/';
                break;
            default:
                link = '';
            }
            // adding the link to the array.
            tableLink.push(
                <a href={`${link}${data.value}`} target="_blank" rel="noopener noreferrer" className="value" key={data.value} style={{ color: `${colors.red_highlight}` }}>
                    {` ${data.value}`}
                </a>,
            );
            return tableLink;
        };

        // this returns table data.
        const createTableData = (data) => {
            let tableData = '';
            if (data.name.replace(/_/g, ' ') === 'symbol' && isDrugData.length === 0) {
                tableData = 'Gene Cards';
            } else if (data.name.replace(/_/g, ' ') === 'name') {
                tableData = 'ENSEMBL GID';
            } else {
                tableData = data.name.replace(/_/g, ' ');
            }
            return tableData;
        };

        for (let j = 0; j < data.length; j++) {
            if (data[j].value || data[j].name === 'class_in_vitro' || data[j].name === 'class_in_vivo' || data[j].name === 'carcinogenicity') {
                table.push(
                    <tr key={j}>
                        <td className="name" key={data[j].name} style={{ fontWeight: '600' }}>
                            {
                                createTableData(data[j])
                            }
                        </td>
                        <td className="value" key={data[j].value}>
                            { ( data[j].name === 'name' || data[j].name === 'ensembl_gid' || 
                                    data[j].name === 'entrez_gid' || data[j].name === 'pubchem' ||( data[j].name === 'symbol' && isDrugData.length === 0))
                                ? (
                                    createLink(data[j])
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
