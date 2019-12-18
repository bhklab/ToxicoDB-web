/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const OverviewDoc = () => (
    <div className="doc">
        <h1>Overview</h1>
        <p>ToxicoDB is a web-application that integrates multiple large toxicogenomics datasets and provides seamless data summary and visualization.</p>
        <p>To better understand the molecular mechanisms underlying compound toxicity, great efforts have been made in screening drugs/chemicals against healthy cells to generate large datasets of cellular response to toxin stress. These datasets combine toxicity parameters with genomics such as transcriptomics, metabolomics and proteomics. Such studies aid in assessing the safety of a molecule in pre-clinical stage or in the discovery of biomarkers that indicate toxicity. Studies that help in understanding dose and time dependent response can be very useful in assessing toxicity, even at low levels of exposure.</p>
        <p>ToxicoDB enables researchers as well as non-academics to easily navigate these datasets and use it as a tool to generate meaningful analysis. The database includes three major toxicogenomics datasets, with profiles of 22000 genes and 150 drugs. The major features include drug annotations such as carcinogenicity and genotoxicity, visualization of differential gene expression for the drug of choice along with the option to download the data and analyze one-to-one relationship of drugs and genes.</p>
    </div>
);

export default OverviewDoc;
