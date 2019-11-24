import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/toxicodb-logo.png';
import colors from '../styles/colors';

const StyledNav = styled.div`   
  width: 100%;
  top:0px;
  right:0px;
  height:80px;
  line-height:3em;
  order:1;
  white-space:nowrap;
  background-color: ${colors.lightblue_bg};
  position: fixed;
  white-space:nowrap;
  font-size: calc(1em + 0.2vw);

  @media (max-width : 1023px) {
    height:75px;
  }

  a {
    color: ${colors.blue_header};
    font-family: 'Raleway', sans-serif;
    text-decoration:none;
    font-weight:700;
    &:hover {
        color: ${colors.red_highlight};
        cursor: pointer;
    }
  }

  img {
    position:fixed;
    float:left;
    margin-left:5vw;
    margin-top:10px;
  }

  .links {
    z-index: 10;
    text-align: right;
    padding: 15px 0px 0px 0px;
    margin-left: 175px;
    a {
      padding:0em 2.5vw;
    }
  }
`;

const StyledLogo = styled.img`
  width:150px;
`;

class HeaderNav extends Component {
  render() {
    return (
      <StyledNav className="header-nav">
        <Link to="/">
          <StyledLogo src={logo} alt="logo" />
        </Link>
        <nav className="links">
          <Link to="/documentation/">Documentation</Link>
          <Link to="/drugs/">Drugs</Link>
          <Link to="/genes/">Genes</Link>
          <Link to="/datasets/">Datasets</Link>
        </nav>
      </StyledNav>
    );
  }
}


export default HeaderNav;
