/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/Search.png';

const DatasetDoc = () => (
    <div className="doc">
        <h1>Datasets</h1>
        <p>
            ToxicoDB search engine allows users to query by specific drug of interest or gene of interest or their combination to perform the further analysis.
            {' '}
            <Link to="/">http://toxicodb.ca/</Link>
        </p>
        <Link to="/">
            <img className="doc-img" src={img} alt="" />
        </Link>

    </div>
);

export default DatasetDoc;
