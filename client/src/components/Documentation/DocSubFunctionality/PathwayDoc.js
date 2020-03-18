/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/pathway1.png';

const PathwayDoc = () => (
    <div className="doc">
        <h1>Pathways</h1>
        <p>All pathways included in ToxicoDB can be explored by clicking on Pathways icon in the top right corner.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
    </div>
);

export default PathwayDoc;
