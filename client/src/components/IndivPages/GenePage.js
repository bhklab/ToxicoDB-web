import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import ReactTable from 'react-table';
import AnnotationCard from './AnnotationCard';
import Volcano from '../Plots/Volcano';
import 'react-table/react-table.css';

const StyledGenePage = styled.div`
    width: 80vw;
    max-width: 1200px;
    padding:140px 0px;
    color: ${colors.blue_text};

    .volcanoWrapper {
        margin-top: 120px;
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
`;


class GenePage extends Component {
    constructor() {
        super();
        this.state = {
            geneData: [],
            annotationData: [],
            volcanoData: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // annotations
        fetch(`/api/v1/genes/${params.id}`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                let annotationData = [];
                Object.keys(data[0]).forEach((x, i) => {
                    if (x != "name" && x != "id") {
                        let temp = {
                            "name": x,
                            "value": data[0][x],
                        };
                        annotationData.push(temp)
                    }
                })
                this.setState({ geneData: data[0], annotationData: annotationData});
            });

        // volcano plot
        fetch(`/api/v1/analysis?geneId=${params.id}`)
            .then((response) => response.json())
            .then((res) => {
                const {data} = res;
                this.setState({volcanoData: data})
            })
        
    }

    render() {
        const {geneData, annotationData, volcanoData} = this.state;
        return (
        <StyledGenePage>
            {geneData.length == 0 ? null : (
                <Fragment>
                    <h1>{geneData.name}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} />
                </Fragment>
            )} 
            {volcanoData.length == 0 ? null : (
                <div className="volcanoWrapper">
                    <center><h2>Volcano Plot - {geneData.name}</h2></center>
                    <Volcano 
                        data={volcanoData}
                        plotId="volcanoPlot"
                    />
                </div>
            )}
           
        </StyledGenePage>
        );
    }
}


export default GenePage;
