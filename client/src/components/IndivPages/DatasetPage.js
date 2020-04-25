/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { DatasetDescription } from '../Utils/DatasetDescription';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';
import 'react-table-6/react-table.css';
import downloadIcon from '../../images/download.svg';

const StyledDatasetPage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};

    .volcanoWrapper {
        margin-top: 100px;
    }

    h1 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(2em + 1vw);
        margin:50px 0 40px 0;
    }
    h2 {
        color: ${colors.red_highlight};
        font-family: 'Raleway', sans-serif;
        font-size: calc(1.2em + 0.5vw);
        margin: 20px 0;
        font-weight:600;
    }

    button {
        color: #fff;
        background: ${colors.blue_text};
    
        padding: 8px;
        border: 0;
        font-size: 13px;
        transition: ${transitions.main_trans}
        
        img {
            display: inline-block;
            height: 13px;
            width: auto;
            margin-left: 5px;
        }

        &:hover {
            background-color: ${colors.red_highlight};
        }
  }
`;

const StyledTable = styled.div`
    width: 100%;
    background: #e2f6fd;
    color: ${colors.blue_text};

    table {
        max-width: 100%;
        margin:60px 0px 10px 0px;
    }
    .name {
        font-weight: 600;
    }
    td {
        padding: 10px;
        border: 3px solid white;

        div {
            padding: 3px;
        }
        a {
            color: ${colors.red_highlight}
        }
    }
`;

const generateRow = (el, i) => (
    <tr key={i}>
        <td className="name">{el.name.toUpperCase()}</td>
        {typeof el.value === 'string'
            ? (<td className="value">{el.value}</td>)
            : (
                <td>
                    {Object.entries(el.value).map(
                        (item, index) => {
                            if (el.name === 'Resources' || el.name === 'Publications') {
                                return (
                                    <div key={index}>
                                        <a href={item[1]} target="_blank" rel="noopener noreferrer">{item[0]}</a>
                                    </div>
                                );
                            }
                            return (
                                <div key={index}>
                                    <span style={{ fontWeight: 500 }}>
                                        {item[0]}
                                        :
                                    </span>
                                    {' '}
                                    <span>{item[1]}</span>
                                </div>
                            );
                        },
                    )}
                </td>
            )}
    </tr>
);

const DatasetPage = (props) => {
    const { match: { params } } = props;
    // grabbing the data according to the param id.
    const data = DatasetDescription[params.id];
    const { link } = data;

    // annotations
    const annotationData = [];
    let datasetName;

    Object.keys(data).forEach((element) => {
        if (!(element === 'Dataset' || element === 'link')) {
            const temp = {
                name: element,
                value: data[element],
            };
            annotationData.push(temp);
        } else if (element === 'Dataset') {
            datasetName = data[element];
        }
    });

    return (
        <StyledDatasetPage>
            {annotationData.length === 0 ? null : (
                <div>
                    <h1>{datasetName}</h1>
                    <StyledTable>
                        <table>
                            <tbody>
                                {annotationData.map((el, i) => generateRow(el, i))}
                            </tbody>
                        </table>
                    </StyledTable>
                    <button type="button">
                        <a style={{ color: 'white' }} href={link} download>
                            Download Molecular Data
                            {'   '}
                            <img src={downloadIcon} alt="download icon" />
                        </a>
                    </button>
                </div>
            )}
        </StyledDatasetPage>
    );
};


export default DatasetPage;
