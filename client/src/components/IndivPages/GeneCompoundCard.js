/* eslint-disable react/no-array-index-key */
import React from 'react';
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
        width: 400px;
        font-weight: 600;
    }
`;
const generateLink = (obj, i, type) => {
    let content;
    switch (obj.name) {
    case 'name':
        // human redirect checks by 4 first characters
        if (obj.value[i].substring(0, 4) === 'ENSG') {
            content = <a href={`http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${obj.value[i]}`} target="_blank" rel="noopener noreferrer">{obj.value[i]}</a>;
        } else {
            // rat redirect
            content = <a href={`https://useast.ensembl.org/Rattus_norvegicus/Gene/Summary?g=${obj.value[i]}`} target="_blank" rel="noopener noreferrer">{obj.value[i]}</a>;
        }
        break;
    case 'symbol':
        // handles edge case when both gene and compound have symbol value
        content = type === 'gene' ? <a href={`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${obj.value[i]}`} target="_blank" rel="noopener noreferrer">{obj.value[i]}</a> : obj.value[i];
        break;
    case 'entrez_gid':
        content = <a href={`https://www.ncbi.nlm.nih.gov/gene/?term=${obj.value[i]}`} target="_blank" rel="noopener noreferrer">{obj.value[i]}</a>;
        break;
    case 'pubchem':
        content = <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${obj.value[i]}`} target="_blank" rel="noopener noreferrer">{obj.value[i]}</a>;
        break;
    case 'ctd':
        content = <a target="_blank" rel="noopener noreferrer" href={`http://ctdbase.org/detail.go?type=chem&acc=${obj.value[i].split(':')[1]}`}>{obj.value[i].split(':')[1]}</a>;
        break;
    default:
        content = obj.value[i];
    }
    return (
        <td key={type.concat(i)} className="value-column">{content}</td>
    );
};

const GeneCompoundCard = (props) => {
    const { data, type } = props;
    return (
        <StyledAnnotationCard>
            {data.length !== 0 && (
                <table>
                    <tbody>
                        {data.map((item, index) => (item.value && item.value[0] ? (
                            <tr key={index}>
                                {type !== 'gene' && !item.value[0] ? null : (
                                    <>
                                        {item.name === 'pubchem' ? (
                                            <td className="name-column">PUBCHEM CID</td>
                                        ) : (
                                            <td className="name-column">{item.name.replace(/_/g, ' ').toUpperCase()}</td>
                                        )}
                                        {item.value.map((val, i) => generateLink(item, i, type))}
                                    </>
                                )}
                            </tr>
                        ) : null))}
                    </tbody>
                </table>
            )}
        </StyledAnnotationCard>
    );
};


export default GeneCompoundCard;
