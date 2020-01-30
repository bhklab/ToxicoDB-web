/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';

// Funtionality subcomponents
import OverviewDoc from './DocSubFunctionality/OverviewDoc';
import SearchDoc from './DocSubFunctionality/SearchDoc';
import DrugDoc from './DocSubFunctionality/DrugDoc';
import GeneDoc from './DocSubFunctionality/GeneDoc';
import DrugGeneDoc from './DocSubFunctionality/DrugGeneDoc';
import DatasetDoc from './DocSubFunctionality/DatasetDoc';
// API subcomponents
import DrugApiDoc from './DocSubAPI/DrugAPIDoc';
import GeneApiDoc from './DocSubAPI/GeneAPIDoc';
import ExperimentApiDoc from './DocSubAPI/ExperimentAPIDoc';
import DatasetApiDoc from './DocSubAPI/DatasetAPIDoc';
import SampleApiDoc from './DocSubAPI/SampleAPIDoc';


const StyledDiv = styled.div`
    padding: 10px;
    width: 100%;

    main {
        display: flex;
        max-width: 1200px;
        padding: 30px;
        text-align: justify;
        font-size: 20px;
        min-height: 80vh;
        margin: 50px auto 0px auto;

        .doc {
            // background-color: ${colors.lightblue_bg};
            // max-width: calc(100% - 250px);
            margin-left: 50px;
            padding: 15px;

            h1,
            h2,
            h3 {
                color: ${colors.red_highlight};
                padding: 20px 0;
            }
            p {
                color: ${colors.blue_text};
            }
            .code {
                width: calc(100% - 10px);
                background-color: #444444;
                padding: 5px;
                color: #fff;
                margin: 0;
            }
        }
        nav {
            margin-top: 25px;

            h3 {
                color: ${colors.blue_text};
            }

            li {
                padding: 2px 2px 0;
                transition: ${transitions.main_trans}
                font-size: 18px;
                margin-left:25px;
                border-left: 3px solid ${colors.blue_text};

                button {
                    font-weight: bold
                    border: 2px solid white;
                    padding: 15px 10px;
                    width: 100%;
                    color: ${colors.blue_text}
                    outline: none;
                    transition: ${transitions.main_trans};
                    cursor: pointer;
                    text-align:left;
                    background-color: white;
                }
                
                &.selected {
                    border-left: 3px solid ${colors.red_highlight};
                    button {
                        color: ${colors.red_highlight}
                    }
                }
              }
              
        }
      } 
    }
    a {
        font-family: Nunito Sans,sans-serif;
        color: ${colors.blue_header};
        transition: ${transitions.main_trans}
        &:hover {
            color: ${colors.red_highlight};
        }
    }

    .doc-img {
        margin: 10px 0;
        width: 100%;
        max-width: 100%;
        dipslay: block;
        padding-bottom: 100px;
        border-bottom: 2px solid ${colors.blue_header}

        &.last {
            border-bottom: none;
        }
    }
    p {
        font-size: 20px;
        font-weight: 400;
    }  
    .output {
        width: calc(100% - 10px);
        background-color: #444444;
        padding: 5px;
        font-size: 15px;
        color: ${colors.red_highlight};
    }
    .api-section {
        width: 100%;
        margin: 10px;
        border-bottom: 2px solid ${colors.red_highlight};
        &:nth-last-of-type(1) {
        border-bottom: none;
        }
    }
`;

const MainDocument = () => {
    const [display, setDisplay] = useState('overview');

    return (

        <StyledDiv>
            <main className="documentation">
                <nav>
                    <h3>Functionality</h3>
                    <ul>
                        <li
                            className={display === 'overview' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('overview')}>Overview</button>
                        </li>
                        <li
                            className={display === 'search' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('search')}>Search</button>
                        </li>
                        <li
                            className={display === 'drugs' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('drugs')}>Drugs</button>
                        </li>
                        <li
                            className={display === 'genes' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('genes')}>Genes</button>
                        </li>
                        <li
                            className={display === 'drugvsgene' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('drugvsgene')}>Drug vs Gene</button>
                        </li>
                        <li
                            className={display === 'datasets' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('datasets')}>Datasets</button>
                        </li>
                    </ul>
                    <h3>API</h3>
                    <ul>
                        <li
                            className={display === 'drug-api' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('drug-api')}>Drugs</button>
                        </li>
                        <li
                            className={display === 'gene-api' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('gene-api')}>Genes</button>
                        </li>
                        <li
                            className={display === 'experiment-api' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('experiment-api')}>Drug vs Gene</button>
                        </li>
                        <li
                            className={display === 'dataset-api' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('dataset-api')}>Datasets</button>
                        </li>
                        <li
                            className={display === 'sample-api' ? 'selected' : null}
                        >
                            <button type="button" onClick={() => setDisplay('sample-api')}>Samples</button>
                        </li>
                    </ul>
                </nav>
                {display === 'overview' ? <OverviewDoc /> : null}
                {display === 'search' ? <SearchDoc /> : null}
                {display === 'drugs' ? <DrugDoc /> : null}
                {display === 'genes' ? <GeneDoc /> : null}
                {display === 'drugvsgene' ? <DrugGeneDoc /> : null}
                {display === 'datasets' ? <DatasetDoc /> : null}
                {display === 'drug-api' ? <DrugApiDoc /> : null}
                {display === 'gene-api' ? <GeneApiDoc /> : null}
                {display === 'experiment-api' ? <ExperimentApiDoc /> : null}
                {display === 'dataset-api' ? <DatasetApiDoc /> : null}
                {display === 'sample-api' ? <SampleApiDoc /> : null}
            </main>
        </StyledDiv>
    );
};

export default MainDocument;
