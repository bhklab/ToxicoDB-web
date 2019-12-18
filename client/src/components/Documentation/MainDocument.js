/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';
// import APIDoc from './APIdocumentation';
// import FunctionalDoc from './FunctionalDoc';

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
    &.documentation {
      width: 100%;
      background:white;
      font-family: Nunito Sans, sans-serif;
      color:${colors.nav_links};
      h1, h2 {
        margin: 25px 0;
      }
      span {
        font-size: 20px;
      }
      h2 {
        padding:20px 0px;
      }
    }
    .doc {
        margin-left: 30px;
    }
    nav {
        margin-top: 25px;
        // position: fixed;
        max-width:300px;
        li {
            padding: 10px;
            margin-bottom: 5px;
            border-left: 2px solid ${colors.color_main_2}
            transition: ${transitions.main_trans}
            &.selected {
                border-left:2px solid ${colors.color_main_5}
                button {
                    color: ${colors.color_main_5}
                }
            }
            &.sub-head {
              font-size: 18px;
              margin-left:10px;
              padding: 10px;
              border-left: none;
              font-weight: bold;
            }
            &.sub-func {
              font-size: 15px;
              margin-left:25px;
              padding: 10px;
              border-left: none;
            }
          }
          button {
            border: 0;
            padding: 0;
            background: white;
            color: ${colors.color_main_2}
            outline: none;
            transition: ${transitions.main_trans};
            cursor: pointer;
            text-align:left;
          }
    }
    ol {
      list-style: none;
      padding: 10px 0;
    }
  } 
  footer {
    text-align: center;
    font-size: 20px;
    color: ${colors.color_main_2}
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
                                <button type="button" onClick={() => handleDocChange('overview')}>Functionality</button>
                            </li>
                            {/* Functionality sub-features */}
                            {/* Basic features */}
                            <li className="sub-head">Basic Features</li>
                            <li
                                className={display === 'search' ? 'selected sub-func' : 'sub-func'}
                            >
                                <button type="button" onClick={() => handleDocChange('search')}>Search</button>
                            </li>
                            <li
                                className={display === 'drugs' ? 'selected sub-func' : 'sub-func'}
                            >
                                <button type="button" onClick={() => handleDocChange('drugs')}>Drugs</button>
                            </li>
                            <li
                                className={display === 'genes' ? 'selected sub-func' : 'sub-func'}
                            >
                                <button type="button" onClick={() => handleDocChange('genes')}>Genes</button>
                            </li>
                            <li
                                className={display === 'drugvsgene' ? 'selected sub-func' : 'sub-func'}
                            >
                                <button type="button" onClick={() => handleDocChange('drugvsgene')}>Drug vs Gene</button>
                            </li>
                            <li
                                className={display === 'datasets' ? 'selected sub-func' : 'sub-func'}
                            >
                                <button type="button" onClick={() => handleDocChange('datasets')}>Datasets</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="doc">
                        {type === 'general' ? (
                            <h1> Hey </h1>
                        ) : (
                            <h1> Hey </h1>
                        )}
                        {/* {display === 'func' ? <GeneralDoc /> : <APIDoc />} */}
                    </div>
                </main>
            </StyledDiv>
        );
    }
}

export default MainDocument;
