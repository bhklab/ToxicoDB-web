/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnnotationCard = styled.div`
    width: 100%;
    background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    
    
    table {
        width:100%;
        
    }
    td {
        padding: 10px;
        border: 3px solid white;

        a {
            color: ${colors.red_highlight};
        }
    }
    .name {
        text-transform:uppercase;
    }
    .value {
    }
    .name-column {
        font-weight: 600;
    }
`;
const generateLink = (obj, type) => {
    let content;
    switch (obj.name) {
    case 'name':
        content = <a href={`http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${obj.value}`} target="_blank" rel="noopener noreferrer">{obj.value}</a>;
        break;
    case 'symbol':
        // handles edge case when both gene and drug have symbol value
        content = type === 'gene' ? <a href={`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${obj.value}`} target="_blank" rel="noopener noreferrer">{obj.value}</a> : obj.value;
        break;
    case 'entrez_gid':
        content = <a href={`https://www.ncbi.nlm.nih.gov/gene/?term=${obj.value}`} target="_blank" rel="noopener noreferrer">{obj.value}</a>;
        break;
    case 'pubchem':
        content = <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${obj.value}`} target="_blank" rel="noopener noreferrer">{obj.value}</a>;
        break;
    default:
        content = obj.value;
    }
    return (
        <td className="value-column">{content}</td>
    );
};


const GeneDrugCard = (props) => {
    const { data, type } = props;
    return (
        <StyledAnnotationCard>
            {data.length !== 0 && (
                <table>
                    <tbody>
                        {data.map((item, index) => (item.value ? (
                            <tr key={index}>
                                <td className="name-column">{item.name.replace(/_/g, ' ').toUpperCase()}</td>
                                {generateLink(item, type)}
                            </tr>
                        ) : null))}
                    </tbody>
                </table>
            )}
        </StyledAnnotationCard>
    );
};


export default GeneDrugCard;
