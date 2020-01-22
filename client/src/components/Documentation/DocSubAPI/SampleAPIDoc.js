/* eslint-disable max-len */
import React from 'react';

const cellData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: 'Hepatocyte',
            tissue_id: 1,
        },
    ],
};

const tissueData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: 'Liver',
            code: '',
        },
    ],
};

const specieData = {
    status: 'success',
    data: [
        {
            name: 'Human',
        },
        {
            name: 'Rattus norvegicus',
        },
    ],
};


const SampleApiDoc = () => (
    <div className="doc">
        <h1>API Documentation</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
             supports RESTful API which allows users to directly query the database without having to use web app interface
        </p>
        <h2>Cell API</h2>
        <div className="api-section">
            <h3>Get List of Cells</h3>
            <p>
                Retrieves data about all cell types that are available in
                {' '}
                <em>ToxicoDB</em>
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/cells</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(cellData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get List of Tissues</h3>
            <p>
                Retrieves data about all tissue types that are available in
                {' '}
                <em>ToxicoDB</em>
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/tissues</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(tissueData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get List of Species</h3>
            <p>
                Retrieves data about all species that are available in
                {' '}
                <em>ToxicoDB</em>
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/species</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(specieData, null, 2)}</pre></div>
        </div>
    </div>
);

export default SampleApiDoc;
