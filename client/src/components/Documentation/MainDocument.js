/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';

import OverviewDoc from './DocSubComponents/OverviewDoc';
import SearchDoc from './DocSubComponents/SearchDoc';
import DrugDoc from './DocSubComponents/DrugDoc';
import GeneDoc from './DocSubComponents/GeneDoc';
import DrugGeneDoc from './DocSubComponents/DrugGeneDoc';
import DatasetDoc from './DocSubComponents/DatasetDoc';

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
        margin: 0 auto;

        .doc {
            // background-color: ${colors.lightblue_bg};
            // max-width: calc(100% - 250px);
            margin-left: 25px;
            padding: 15px;

            h1 {
                color: ${colors.red_highlight};
            }
            p {
                color: ${colors.blue_text};
            }
        }
        nav {
            width:250px;
            margin-top: 25px;

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
    }
`;

class MainDocument extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            display: 'overview',
            type: 'general',
        };
        this.handleDocChange = this.handleDocChange.bind(this);
    }

    handleDocChange(display) {
        console.log(display);
        switch (display) {
        case 'overview':
            this.setState({
                display, type: 'general',
            });
            break;
        case 'search':
            this.setState({
                display, type: 'general',
            });
            break;
        case 'drugs':
            this.setState({
                display, type: 'general',
            });
            break;
        case 'genes':
            this.setState({
                display, type: 'general',
            });
            break;
        case 'drugvsgene':
            this.setState({
                display, type: 'general',
            });
            break;
        case 'datasets':
            this.setState({
                display, type: 'general',
            });
            break;
        default:
            this.setState({ display, type: 'api' });
            break;
        }
    }

    render() {
        const { handleDocChange } = this;
        const {
            display, type,
        } = this.state;
        return (

            <StyledDiv>
                <main className="documentation">
                    <nav>
                        <ul>
                            <li
                                className={display === 'overview' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('overview')}>Overview</button>
                            </li>
                            <li
                                className={display === 'search' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('search')}>Search</button>
                            </li>
                            <li
                                className={display === 'drugs' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('drugs')}>Drugs</button>
                            </li>
                            <li
                                className={display === 'genes' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('genes')}>Genes</button>
                            </li>
                            <li
                                className={display === 'drugvsgene' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('drugvsgene')}>Drug vs Gene</button>
                            </li>
                            {/* <li
                                className={display === 'datasets' ? 'selected' : null}
                            >
                                <button type="button" onClick={() => handleDocChange('datasets')}>Datasets</button>
                            </li> */}
                        </ul>
                    </nav>
                    {display === 'overview' ? <OverviewDoc /> : null}
                    {display === 'search' ? <SearchDoc /> : null}
                    {display === 'drugs' ? <DrugDoc /> : null}
                    {display === 'genes' ? <GeneDoc /> : null}
                    {display === 'drugvsgene' ? <DrugGeneDoc /> : null}
                    {/* {display === 'datasets' ? <DatasetDoc /> : null} */}
                </main>
            </StyledDiv>
        );
    }
}

export default MainDocument;
