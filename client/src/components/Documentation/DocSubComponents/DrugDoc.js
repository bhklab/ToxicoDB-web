/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/Drug.png';

const DrugDoc = () => (
    <div className="doc">
        <h1>Drug</h1>
        <p>
        In the SEARCH bar, users can query their drug of interest that will yield a web page with drug annotations linked to PubChem, tabular and downloadable data of differential gene expression of the drug and a volcano plot visualization of the same data with the option to switch between dataset. The list of genes can be used for pathway analysis or in feature selection for machine learning models.  Example - To look at the top genes modulated by the drug Carbon tetrachloride  (carcinogenic, genotoxic in vitro and non-genotoxic in vivo). Query URL -
            {' '}
            <Link to="/drugs/9">http://toxicodb.ca/drugs/9</Link>
        </p>
        <Link to="/drugs/9">
            <img className="doc-img" src={img} alt="" />
        </Link>

    </div>
);

export default DrugDoc;
