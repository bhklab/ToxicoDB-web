/* eslint-disable max-len */
import React from 'react';

const allDatasetData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: 'TGGATES Human',
        },
        {
            id: 2,
            name: 'TGGATES Rat',
        },
        {
            id: 3,
            name: 'drugMatrix',
        },
    ],
};

const drugData = {
    status: 'success',
    data: [
        {
            id: 72,
            name: 'Chlorpropamide',
            symbol: 'CPP',
            pubchem: 2727,
            chembl: '',
            drugbank: '',
            carcinogenicity: 'NC',
            class_in_vitro: 'NGTX',
            class_in_vivo: '',
            targets: '',
            class_name: '',
            smiles: 'CCCNC(=O)NS(=O)(=O)c1ccc(Cl)cc1',
            inchikey: 'RKWGIWYCVPQPMF-UHFFFAOYSA-N',
        },
    ],
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
            <p>Retrieves data about all available datasets</p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/datasets</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(allDatasetData, null, 2)}</pre></div>
        </div>
    </div>
);

export default DatasetApiDoc;
