/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/3.png';
import img2 from '../../../images/4.png';
import img3 from '../../../images/5.png';
import img4 from '../../../images/6.png';
import img5 from '../../../images/18.png';
import img6 from '../../../images/19.png';

const CompoundDoc = () => (
    <div className="doc">
        <h1>Compounds</h1>
        <p>All compounds in ToxicoDB can be accessed by clicking on Compounds on the top right corner of the front page.</p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>Users can look at all compounds profiled across the datasets here with the option to filter compounds based on carcinogenicity and genotoxicity. Each compound page starts with a card which displays information about the compound such as Pubchem annotations, carcinogenicity and genotoxicity.</p>
        <Link to="/compounds">
            <img className="doc-img" src={img2} alt="" />
        </Link>
        <p><b>Single Compound Search</b></p>
        <p>Each compound included in ToxicoDB has a web page associated with it. These pages can be accessed by searching for a compound name through the search bar.</p>
        <Link to="/">
            <img className="doc-img" src={img3} alt="" />
        </Link>
        <p>Upon entering the compound of choice, an exclusive web page for the compound shows annotations and links to PubChem, highlighted in pink.</p>
        <Link to="/compounds/7">
            <img className="doc-img" src={img4} alt="" />
        </Link>
        <p>This is the tabular data of differentially expressed genes generated using limma package for the compound of choice. The dataset can be selected by typing the name in the Dataset column. Additionaly, table data can be filtered and downloaded in csv format for future use.</p>
        <Link to="/compounds/7">
            <img className="doc-img" src={img5} alt="" />
        </Link>
        <p>
            Volcano plot visualization of the above data. Green dots, if present, represent genes with substantial fold change and statistically significance (FDR
            {' '}
            {'<'}
            {' '}
            0.05). The name of the gene will be highlighted upon hovering on the dots as shown below.
        </p>
        <Link to="/compounds/7">
            <img className="doc-img last" src={img6} alt="" />
        </Link>
    </div>
);

export default CompoundDoc;
