/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../images/1.png';
import img2 from '../../../images/2.png';

const SearchDoc = () => (
    <div className="doc">
        <h1>Search</h1>
        <p>
            The main way to interact with
            {' '}
            <em>ToxicoDB</em>
            {' '}
            is through its search interface. The search bar, found on the homepage of the website, allows the user to query all the data contained in the database, and functions as the main navigation tool around the web app.
        </p>
        <p>
            <em>ToxicoDB</em>
            ’s search bar takes three types of queries. The simplest is to query for a single gene; rat or human, (e.g., Cyp1a1 or CYP1A1) or drug (e.g., Carbon tetrachloride).
        </p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>One can use the search to query for the association of a specific drug-gene pair (e.g., Carbon tetrachloride, CYP1A1), in a dataset. This query will direct you to a page plotting gene expression versus time plot.</p>
        <Link to="/">
            <img className="doc-img" src={img2} alt="" />
        </Link>
    </div>
);

export default SearchDoc;
