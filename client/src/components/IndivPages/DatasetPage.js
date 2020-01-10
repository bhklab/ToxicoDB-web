import React, { Component } from 'react';
import styled from 'styled-components';
import { DatasetDescription } from './DatasetDescription';
import colors from '../../styles/colors';
import AnnotationCard from './AnnotationCard';
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

    a {
      color: ${colors.blue_text};
    }
    
    .table {
        margin:60px 0px 30px 0px;
    }
`;

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
                        <AnnotationCard data={annotationData} />
                    </div>
                )}
            </StyledDatasetPage>
        );
    }
}


export default DatasetPage;
