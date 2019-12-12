import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import ReactTable from 'react-table';
import AnnotationCard from './AnnotationCard';
import Volcano from '../Plots/Volcano';
import 'react-table/react-table.css';

import LoadingComponent from '../Utils/Loading';

const StyledGenePage = styled.div`
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

const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    switch (typeof row[id]) {
      case 'object':
        // checks for metastasis label
        if (row[id] && row[id].origin) {
          return String('metastasis').includes(filter.value.toLowerCase());
        }
        // checks for disease name (additional check is to filter out null values)
        return row[id] && row[id].name
          ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
          : false;
      // handles age filtering
      case 'number':
        return row[id].toString().includes(filter.value);
      case 'string':
        return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
      default:
        return false;
    }
};

class GenePage extends Component {
    constructor() {
        super();
        this.state = {
            geneData: [],
            annotationData: [],
            volcanoData: [],
            analysisData: [],
            loading: true,
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
                    if (x != "name" && x != "id" && x != "ensembl_tid") {
                        let temp = {
                            "name": x,
                            "value": data[0][x],
                        };
                        annotationData.push(temp)
                    }
                })
                this.setState({ geneData: data[0], annotationData: annotationData});
            });

        // // volcano plot
        // fetch(`/api/v1/analysis?geneId=${params.id}`)
        //     .then((response) => response.json())
        //     .then((res) => {
        //         const {data} = res;
        //         this.setState({volcanoData: data})
        //     })

        // analysis table
        fetch(`/api/v1/genes/${params.id}/analysis`)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                this.setState({volcanoData: data, analysisData: data, loading: false})
            });
        
    }

    render() {
        const {geneData, annotationData, volcanoData, analysisData, loading} = this.state;
        const columns = [{
            Header: 'Drug',
            accessor: 'drug_name',
            sortable: true,
            Cell: (row) => {
                return (<Link to={`/expression?drugId=${row.original.drug_id}&geneId=${geneData.id}`}>{row.value}</Link>)
            },
          }, {
            Header: 'p-value',
            accessor: 'p_value',
            sortable: true,
            sortMethod:function(a, b){return b-a},
            Cell: (row) => {
                return parseFloat(row.value).toExponential(2);
            }
          }, {
            Header: 'Dataset',
            accessor: 'dataset_name',
            sortable: true,
          }];
        return (
        <StyledGenePage>
            {geneData.length == 0 ? null : (
                <Fragment>
                    <h1>{geneData.name}</h1>
                    <h2>Annotations</h2>
                    <AnnotationCard data={annotationData} />
                </Fragment>
            )} 
            <ReactTable
                data={analysisData}
                columns={columns}
                filterable
                defaultFilterMethod={filterCaseInsensitive}
                className="table -highlight"
                defaultPageSize={10}
                defaultSorted={[
                    {
                        id: "p_value",
                        desc: true
                    }
                ]}
                loading={loading}
                LoadingComponent={LoadingComponent}
            />

            {volcanoData.length == 0 ? null : (
                <div className="volcanoWrapper">
                    <center><h2>Analysis - {geneData.name}</h2></center>
                    <Volcano 
                        data={volcanoData}
                        plotId="volcanoPlot"
                        type="gene"
                    />
                </div>
            )}
           
        </StyledGenePage>
        );
    }
}


export default GenePage;
