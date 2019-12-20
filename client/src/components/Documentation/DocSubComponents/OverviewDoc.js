/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const OverviewDoc = () => (
    <div className="doc">
        <h1>Overview</h1>
        <p>
            <em>ToxicoDB</em>
            {' '}
            is a new web application providing seamless data summary, analysis and visualization of multiple large toxicogenomics datasets. Toxicogenomics is a sub-discipline of pharmacology that takes advantage of multi-omics data such as transcriptomics, proteomics, and metabolomics to predict toxicity. ToxicoDB harmonizes heterogeneous data across datasets, allowing users to easily query and summarize the associations between gene expression and the effects of toxicants.
        </p>
        <p>
            <em>ToxicoDB</em>
            {' '}
            enables researchers as well as non-academics to easily navigate these datasets, visualize time and dose-dependent drug response of genes implicated in toxin metabolism and build gene signatures based on grades of toxicity such as carcinogenicity and genotoxicity. The major features include chemical compound annotations, visualization of differential gene expression for the drug of choice along with the option to download the data and analyze the one-to-one relationship between drugs and genes.
        </p>
    </div>
);

export default OverviewDoc;
