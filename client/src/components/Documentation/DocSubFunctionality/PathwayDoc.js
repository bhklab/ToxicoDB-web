/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/pathway1.png';
import img2 from '../../../images/pathway2.png';
import img3 from '../../../images/pathway3.png';

const PathwayDoc = () => (
    <div className="doc">
        <h1>Pathways</h1>
        <p>All pathways included in ToxicoDB can be explored by clicking on Pathways icon in the top right corner.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>This displays a heatmap of the most most significant pathways and compounds from Open TG-GATEs Human Dataset.</p>
        <Link to="/pathways">
            <img className="doc-img" src={img2} alt="" />
        </Link>
        <p>
            The selection allows the user to chose the dataset, a single compound or list of compounds and one of the ontologies GO or Reactome.
            The pathways of interest  can be selected from drop-down or using keyword search like&nbsp;
            <q>Oxidation</q>
            .
            This displays a heatmap of the data highlighted by FDR significance.
        </p>
        <Link to="/pathways">
            <img className="doc-img last" src={img3} alt="" />
        </Link>
    </div>
);

export default PathwayDoc;
