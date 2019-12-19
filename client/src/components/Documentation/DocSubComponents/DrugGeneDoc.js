/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/DrugGene.png';

const DrugGeneDoc = () => (
    <div className="doc">
        <h1>Drug and Gene</h1>
        <p>
        To visualize the effect of a drug on the gene of interest in a  dataset, the drug and gene name can be typed in the search bar. This will retrieve a time and dose-dependent plot, with biological replicates (represented as dotted lines). (e.g., Carbon tetrachloride, CYP1A1). <br></br>Query URL -
            {' '}
            <Link to="/expression?drugId=9&geneId=7468">http://toxicodb.ca/expression?drugId=9&geneId=7468</Link>
        </p>
        <Link to="/expression?drugId=9&geneId=7468">
            <img className="doc-img" src={img} alt="" />
        </Link>

    </div>
);

export default DrugGeneDoc;
