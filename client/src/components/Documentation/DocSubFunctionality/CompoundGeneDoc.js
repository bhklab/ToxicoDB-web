/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/2.png';
import img2 from '../../../images/15.png';

const CompoundGeneDoc = () => (
    <div className="doc">
        <h1>Compound vs Gene</h1>
        <p>To look at the association of a compound on your gene of choice, a query with compound and gene name will take you to a page where gene expression versus time plot is plotted.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>All experiments performed on the dataset for the given compound can be visualized here. Datasets can be selected at the bottom right corner of the plot. In the plot below, time and dose dependent effect of Carbon tetrachloride on CYP1A1 is shown, with biological replicates (represented as dotted lines). The compound and gene name, highlighted in pink, is clickable leading to individual data pages.</p>
        <Link to="expression?compoundId=9&geneId=7396,27541">
            <img className="doc-img last" src={img2} alt="" />
        </Link>
    </div>
);

export default CompoundGeneDoc;
