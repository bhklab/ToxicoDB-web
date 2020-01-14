/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/11.png';
import img2 from '../../../images/12.png';
import img3 from '../../../images/13.png';

const DatasetDoc = () => (
    <div className="doc">
        <h1>Datasets</h1>
        <p>All datasets included in ToxicoDB can be viewed by clicking on Datasets icon in the top right corner.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>The page opens a list of datasets</p>
        <Link to="/datasets/">
            <img className="doc-img" src={img2} alt="" />
        </Link>
        <p>Upon selection of dataset of choice, the details pertaining to the dataset is available with links to data sources and publications.</p>
        <Link to="/datasets/1">
            <img className="doc-img last" src={img3} alt="" />
        </Link>
    </div>
);

export default DatasetDoc;
