/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/3.png';
import img2 from '../../../images/4.png';
import img3 from '../../../images/5.png';
import img4 from '../../../images/6.png';
import img5 from '../../../images/18.png';
import img6 from '../../../images/19.png';

const DrugDoc = () => (
    <div className="doc">
        <h1>Drugs</h1>
        <p>All drugs in ToxicoDB can be accessed by clicking on Drugs on the top right corner of the front page.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>Users can look at all drugs profiles across the datasets here with the option to filter drugs based on carcinogenicity and genotoxicity. Each drug page starts with a card which displays information about the drug such as Pubchem annotations, carcinogenicity and genotoxicity.</p>
        <Link to="/drugs">
            <img className="doc-img" src={img2} alt="" />
        </Link>
        <p><b>Single Drug Search</b></p>
        <p>Each drug included in ToxicoDB has a web page associated with it. These pages can be accessed by searching for a drug name through the search bar.</p>
        <Link to="/">
            <img className="doc-img" src={img3} alt="" />
        </Link>
        <p>Upon entering the drug of choice, an exclusive web page for the drug shows annotations and links to PubChem, highlighted in pink.</p>
        <Link to="/drugs/9">
            <img className="doc-img" src={img4} alt="" />
        </Link>
        <p>This is the tabular data of differentially expressed genes generated using limma package for the drug of choice. The dataset can be selected by typing the name in the Dataset column.</p>
        <Link to="/drugs/9">
            <img className="doc-img" src={img5} alt="" />
        </Link>
        <p>
            Volcano plot visualization of the above data. Green dots, if present, represent genes with substantial fold change and statistically significance (FDR
            {' '}
            {'<'}
            {' '}
            0.05). The name of the gene will be highlighted upon hovering on the dots as shown below.
        </p>
        <Link to="/drugs/9">
            <img className="doc-img" src={img6} alt="" />
        </Link>
    </div>
);

export default DrugDoc;
