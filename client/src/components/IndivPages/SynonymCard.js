/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledSynonymCard = styled.div`
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

const SynonymCard = (props) => {
    const { data } = props;
    return (
        <StyledSynonymCard>
            {data.length !== 0 && (
                <table>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="name-column">{item.name}</td>
                                <td className="value-column">{item.drug_uid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </StyledSynonymCard>
    );
};


export default SynonymCard;
