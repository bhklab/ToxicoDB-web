import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

import AnnotationCard from './AnnotationCard';

const StyledDrugPage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};
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
`;


class DrugPage extends Component {
    constructor() {
        super();
        this.state = {
            drugData: [],
            annotationData: [],
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        fetch(`/api/v1/drugs/${params.id}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                let annotationData = [];
                Object.keys(data[0]).forEach((x, i) => {
                    if (x != "name") {
                        let temp = {
                            "name": x,
                            "value": data[0][x],
                        };
                        annotationData.push(temp)
                    }
                })
                this.setState({ drugData: data[0], annotationData: annotationData});
            });
    }

    render() {
        const {drugData, annotationData} = this.state;
        return (
        <StyledDrugPage>
            {drugData.length == 0 ? null : (
                <Fragment>
                    <h1>{drugData.name}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} />
                </Fragment>
            )} 
        </StyledDrugPage>
        );
    }
}


export default DrugPage;
