/* eslint-disable max-len */
import React from 'react';

const allDatasetData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: 'TGGATEs Human',
        },
        {
            id: 2,
            name: 'TGGATEs Rat',
        },
        {
            id: 3,
            name: 'DrugMatrix',
        },
    ],
};

const datasetData = {
    status: 'success',
    data: [{
        id: 1,
        name: 'TGGATEs Human',
    }],
};


const DatasetApiDoc = () => (
    <div className="doc">
        <h1>API Documentation</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
             supports RESTful API which allows users to directly query the database without having to use web app interface
        </p>
        <h2>Dataset API</h2>
        <div className="api-section">
            <h3>Get All Datasets</h3>
            <p>Retrieves data about all available datasets</p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/datasets</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(allDatasetData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Specific Dataset</h3>
            <p>Retrieves data about the specific dataset</p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/datasets/1</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(datasetData, null, 2)}</pre></div>
        </div>
    </div>
);

export default DatasetApiDoc;
