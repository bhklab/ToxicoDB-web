/* eslint-disable max-len */
import React from 'react';

const allGeneData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: 'ENSG00000000003',
            symbol: 'TSPAN6',
            ensembl_tid: 'ENST00000373020',
            entrez_gid: 7105,
            transcript_name: 'TSPAN6-201',
        },
        {
            id: 2,
            name: 'ENSG00000000005',
            symbol: 'TNMD',
            ensembl_tid: 'ENST00000373031',
            entrez_gid: 64102,
            transcript_name: 'TNMD-201',
        },
    ],
};

const geneData = {
    status: 'success',
    data: [
        {
            id: 423,
            name: 'ENSG00000023909',
            symbol: 'GCLM',
            ensembl_tid: 'ENST00000370238',
            entrez_gid: 2730,
            transcript_name: 'GCLM-201',
        },
        {
            id: 25156,
            name: 'ENSRNOG00000013409',
            symbol: 'Gclm',
            ensembl_tid: 'ENSRNOT00000018343',
            entrez_gid: 29739,
            transcript_name: 'Gclm-201',
        },
    ],
};

const geneAnalysis = {
    status: 'success',
    data: [
        {
            fdr: '0.96018974227174',
            fold_change: 0.19266541,
            p_value: '0.0202808698017121',
            drug_id: 8,
            drug_name: 'Clofibrate',
            dataset_name: 'Open TG-GATEs Human',
        },
        {
            fdr: '0.999977323448391',
            fold_change: -0.33967578,
            p_value: '0.0312435168299573',
            drug_id: 9,
            drug_name: 'Carbon tetrachloride',
            dataset_name: 'Open TG-GATEs Human',
        },
        {
            fdr: '2.24559485733538e-42',
            fold_change: -1.00161648,
            p_value: '4.73617184210643e-44',
            drug_id: 10,
            drug_name: 'Phenobarbital',
            dataset_name: 'Open TG-GATEs Human',
        },
    ],
};


const GeneApiDoc = () => (
    <div className="doc">
        <h1>API Documentation</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
             supports RESTful API which allows users to directly query the database without having to use web app interface
        </p>
        <h2>Gene API</h2>
        <div className="api-section">
            <h3>Get list of genes</h3>
            <p>Retrieves data for all genes that have been used in the analysis</p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/genes</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(allGeneData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Specific Genes</h3>
            <p>
                Retrieves information for a given gene or genes. The API request requires
                {' '}
                <em>gene id</em>
                {' '}
                (integer)
                {' '}
                request paramater. The API allows to select multiple genes at once
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/genes/423,25156</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(geneData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Gene Analysis Data</h3>
            <p>
                Retrieves analysis data for a given gene or genes tested against multiple compounds. The API requires
                Retrieves information for a given gene or genes.
                {' '}
                {' '}
                <em>gene id</em>
                {' '}
                (integer)
                {' '}
                to process the request. The API allows to select multiple genes at once
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/genes/423,25156/analysis</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(geneAnalysis, null, 2)}</pre></div>
        </div>
    </div>
);

export default GeneApiDoc;
