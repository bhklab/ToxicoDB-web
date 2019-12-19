/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/Gene.png';

const GeneDoc = () => (
    <div className="doc">
        <h1>Gene</h1>
        <p>
        Gene name search directs to an individual gene page with gene annotations that are linked to external databases. This page also has a  tabular and downloadable data of all drugs with fold change and p values and a volcano plot visualization of the top drugs that impact the gene. Example - CYP1A1, an indicator of xenobiotic metabolism. Query URL -
            {' '}
            <Link to="/genes/7468">http://toxicodb.ca/genes/7468</Link>
        </p>
        <Link to="/genes/7468">
            <img className="doc-img" src={img} alt="" />
        </Link>

    </div>
);

export default GeneDoc;
