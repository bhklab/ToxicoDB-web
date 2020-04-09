/* eslint-disable max-len */
import React from 'react';

const allCompoundData = {
    status: 'success',
    data: [
        {
            id: 1,
            name: '1-Naphthyl isothiocyanate',
            symbol: 'ANIT',
            pubchem: 11080,
            chembl: '',
            drugbank: '',
            carcinogenicity: '',
            class_in_vitro: 'NGTX',
            class_in_vivo: '',
            targets: '',
            class_name: '',
            smiles: 'C1=CC=C2C(=C1)C=CC=C2N=C=S',
            inchikey: 'JBDOSUUXMYMWQH-UHFFFAOYSA-N',
        },
        {
            id: 2,
            name: 'Phenylbutazone',
            symbol: 'PhB',
            pubchem: 4781,
            chembl: '',
            drugbank: '',
            carcinogenicity: 'C',
            class_in_vitro: 'GTX',
            class_in_vivo: 'NGTX',
            targets: '',
            class_name: '',
            smiles: 'CCCCC1C(=O)N(N(C1=O)C2=CC=CC=C2)C3=CC=CC=C3',
            inchikey: 'VYMDGNCVAMGZFE-UHFFFAOYSA-N',
        },
    ],
};

const compoundData = {
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

const compoundSynonymData = {
    status: 'success',
    data: [{
        name: 'Open TG-GATEs Human',
        drug_uid: 'chlorpropamide',
    }, {
        name: 'Open TG-GATEs Rat',
        drug_uid: 'ethambutol',
    }],
};

const compoundAnalysis = {
    status: 'success',
    data: [
        {
            fdr: '0.0140394900967384',
            fold_change: -0.26868251,
            p_value: '0.00275455691716522',
            gene_id: 3935,
            gene_name: 'MSH3',
            dataset_name: 'Open TG-GATEs Human',
        },
        {
            fdr: '0.0140665335551909',
            fold_change: -0.39425924,
            p_value: '0.00276156045048297',
            gene_id: 3937,
            gene_name: 'GABRG2',
            dataset_name: 'Open TG-GATEs Human',
        },
        {
            fdr: '0.0140665335551909',
            fold_change: -0.35523966,
            p_value: '0.00276196694955832',
            gene_id: 3938,
            gene_name: 'CCNG1',
            dataset_name: 'Open TG-GATEs Human',
        },
    ],
};


const CompoundAPIDoc = () => (
    <div className="doc">
        <h1>API Documentation</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
             supports RESTful API which allows users to directly query the database without having to use web app interface
        </p>
        <h2>Compound API</h2>
        <div className="api-section">
            <h3>Get List of Compounds</h3>
            <p>Retrieves data for all compounds that have been used in the analysis</p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/drugs</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(allCompoundData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Specific Compound</h3>
            <p>
                Retrieves information for a given compound. The API request requires
                {' '}
                <em>drug id</em>
                {' '}
                (integer)
                {' '}
                request paramater.
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/drugs/72</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(compoundData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Compound Synonyms</h3>
            <p>
                Retrieves synonyms per dataset for a given compound. The API request requires
                {' '}
                <em>drug id</em>
                {' '}
                (integer)
                {' '}
                request paramater.
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/drugs/72/synonyms</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(compoundSynonymData, null, 2)}</pre></div>
        </div>
        <div className="api-section">
            <h3>Get Compound Analysis Data</h3>
            <p>
                Retrieves analysis data for a given compound across all genes. The API requires
                {' '}
                <em>drug id</em>
                {' '}
                (integer)
                {' '}
                to process the request.
            </p>
            <p className="code">
                <span>curl http://toxicodb.ca/api/v1/drugs/1/analysis</span>
            </p>
            <p>Output: </p>
            <div><pre className="output">{JSON.stringify(compoundAnalysis, null, 2)}</pre></div>
        </div>
    </div>
);

export default CompoundAPIDoc;
