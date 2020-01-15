/* eslint-disable max-len */
import React from 'react';

const experimentData = {
    status: 'success',
    data: [
        {
            time: 2,
            expression: 5.67613411,
            dose: 'Control',
            replicate: 1,
            name: 'TGGATES Human LDH',
        },
        {
            time: 2,
            expression: 5.52199507,
            dose: 'Control',
            replicate: 2,
            name: 'TGGATES Human LDH',
        },
        {
            time: 2,
            expression: 5.50437641,
            dose: 'Low',
            replicate: 1,
            name: 'TGGATES Human LDH',
        },
    ],
};

const ExperimentApiDoc = () => (
    <div className="doc">
        <h1>API Documentation</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
             supports RESTful API which allows users to directly query the database without having to use web app interface
        </p>
        <h2>Drug vs Gene API</h2>
        <div className="api-section">
            <p>
                Retrieves expression data for a given gene over time for different concentation of a given drug. The API request requires
                {' '}
                <em>gene id</em>
                {' '}
                (integer)
                {' '}
                and
                {' '}
                <em>drug id</em>
                {' '}
                (integer)
                request paramaters.

            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/experiments?drugId=9&geneId=7468</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(experimentData, null, 2)}</pre></div>
        </div>
    </div>
);

export default ExperimentApiDoc;
