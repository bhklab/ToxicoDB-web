/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img1 from '../../../images/1.png';
import img2 from '../../../images/2.png';
import img3 from '../../../images/20.png';
import img4 from '../../../images/21.png';
import img5 from '../../../images/22.png';
import img6 from '../../../images/23.png';
import arrow from '../../../images/down.svg';


const StyledArrow = styled.div`
    width: 100%;
    img {
        width: 35px;
        margin: 20px auto;
        display: block;
    }    
`;

const SearchDoc = () => (
    <div className="doc">
        <h1>Search</h1>
        <div className="doc-section">
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
                <img style={{ paddingBottom: '100px' }} src={img1} alt="" />
            </Link>
        </div>
        <div className="doc-section">
            <p>
                The compound and gene synonyms can also be queried in the Search bar which would direct to the corresponding page in
                {' '}
                <em>ToxicoDB</em>
                .
            </p>
            <Link to="/">
                <img src={img3} alt="" />
            </Link>
            <StyledArrow>
                <img className="arrow-down" src={arrow} alt="arrow down" />
            </StyledArrow>
            <Link to="/compounds/7">
                <img style={{ paddingBottom: '100px' }} src={img4} alt="" />
            </Link>
        </div>
        <div className="doc-section">
            <Link to="/">
                <img src={img5} alt="" />
            </Link>
            <StyledArrow>
                <img className="arrow-down" src={arrow} alt="arrow down" />
            </StyledArrow>
            <Link to="/genes/4403,22601">
                <img style={{ paddingBottom: '100px' }} src={img6} alt="" />
            </Link>
        </div>
        <div className="doc-section last">
            <p>One can use the search to query for the association of a specific compound-gene pair (e.g., Carbon tetrachloride, CYP1A1), in a dataset. This query will direct you to a page plotting gene expression versus time plot.</p>
            <Link to="/">
                <img style={{ paddingBottom: '100px' }} src={img2} alt="" />
            </Link>
        </div>
    </div>
);

export default SearchDoc;
