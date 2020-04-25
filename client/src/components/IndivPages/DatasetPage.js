import React, { Component } from 'react';
import styled from 'styled-components';
import { DatasetDescription } from '../Utils/DatasetDescription';
import colors from '../../styles/colors';
import 'react-table-6/react-table.css';

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
`;

const StyledTable = styled.div`
    width: 100%;
    background: #e2f6fd;
    color: ${colors.blue_text};

    table {
        max-width: 100%;
        margin:60px 0px 30px 0px;
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

const generateRow = (el) => (
    <tr>
        <td className="name">{el.name.toUpperCase()}</td>
        {typeof el.value === 'string'
            ? (<td className="value">{el.value}</td>)
            : (
                <td>
                    {Object.entries(el.value).map(
                        (item) => {
                            if (el.name === 'Resources' || el.name === 'Publications') {
                                return (
                                    <div>
                                        <a href={item[1]}>{item[0]}</a>
                                    </div>
                                );
                            }
                            return (
                                <div>
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

class DatasetPage extends Component {
    constructor() {
        super();
        this.state = {
            datasetName: '',
            annotationData: [],
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // grabbing the data according to the param id.
        const data = DatasetDescription[params.id];

        // annotations
        const annotationData = [];
        let datasetName = '';
        Object.keys(data).forEach((element) => {
            if (!(element === 'Dataset')) {
                const temp = {
                    name: element,
                    value: data[element],
                };
                annotationData.push(temp);
            } else if (element === 'Dataset') {
                datasetName = data[element];
            }
        });
        this.setState({ annotationData, datasetName });
    }

    render() {
        const {
            datasetName, annotationData,
        } = this.state;
        return (
            <StyledDatasetPage>
                {annotationData.length === 0 ? null : (
                    <div>
                        <h1>{datasetName}</h1>
                        <StyledTable>
                            <table>
                                <tbody>
                                    {annotationData.map((el) => generateRow(el))}
                                </tbody>
                            </table>
                        </StyledTable>
                    </div>
                )}
            </StyledDatasetPage>
        );
    }
}


export default DatasetPage;
