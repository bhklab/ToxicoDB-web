/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/7.png';
import img2 from '../../../images/8.png';
import img3 from '../../../images/9.png';
import img4 from '../../../images/10.png';
import img5 from '../../../images/16.png';
import img6 from '../../../images/17.png';

const GeneDoc = () => (
    <div className="doc">
        <h1>Genes</h1>
        <p>
            All genes in
            {' '}
            <em>ToxicoDB</em>
            {' '}
            can be accessed by clicking on Genes on the top right corner of the front page.
        </p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>The page displays information about the gene annotations such as Ensembl ID, Entrez ID and Transcript Name.</p>
        <Link to="/genes/">
            <img className="doc-img" src={img2} alt="" />
        </Link>
        <p><b>Single Gene search</b></p>
        <p>
            Each gene included in the datasets of
            {' '}
            <em>ToxicoDB</em>
            {' '}
            has a web page associated with it. These pages can be accessed by searching for a gene name through the search bar. Rat and human gene names will be shown upon searching for the gene of interest.
        </p>
        <Link to="/">
            <img className="doc-img" src={img3} alt="" />
        </Link>
        <p>Upon entering the gene name, an exclusive web page for the gene shows annotations and links to several databases, highlighted in pink.</p>
        <Link to="/genes/7396,27541">
            <img className="doc-img" src={img4} alt="" />
        </Link>
        <p>This is a table summarizing top compounds associated with the gene for dataset of choice. The dataset can be selected by typing the name in the Dataset column. Additionaly, table data can be filtered and downloaded in csv format for future use.</p>
        <Link to="/genes/7396,27541">
            <img className="doc-img" src={img5} alt="" />
        </Link>
        <p>
            Lastly, a volcano plot to visualize top compounds associated with the gene. Green dots, if present, represent the top compounds with fold change
            {' '}
            {'>='}
            {' '}
            |1| and FDR
            {' '}
            {'<'}
            {' '}
            0.05. The name of the compound will be highlighted upon hovering on the dots as shown below.
        </p>
        <Link to="/genes/7396,27541">
            <img className="doc-img last" src={img6} alt="" />
        </Link>
    </div>
);

export default GeneDoc;
