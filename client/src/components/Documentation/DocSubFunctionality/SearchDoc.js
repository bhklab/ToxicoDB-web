/* eslint-disable max-len */
import React from 'react';
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
            ’s search bar takes three types of queries. The simplest is to query for a single gene; rat or human, (e.g., CYP1A1) or compound (e.g., Acetaminophen ).
        </p>
        <Link to="/">
            <img className="doc-img" src={img1} alt="" />
        </Link>
        <p>One can use the search to query for the association of a specific compound-gene pair (e.g., Carbon tetrachloride, CYP1A1), in a dataset. This query will direct you to a page plotting gene expression versus time plot.</p>
        <Link to="/">
            <img className="doc-img last" src={img2} alt="" />
        </Link>
    </div>
);

export default SearchDoc;
