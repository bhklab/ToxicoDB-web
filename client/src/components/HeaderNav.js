import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
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

  .standard-nav {
    img {
      position:fixed;
      float:left;
      margin-left:5vw;
      margin-top:5px;
    }
    @media (min-width : 1024px) {
      display: block;
    }
    @media (max-width : 1023px) {
      display: none;
    }
  }

  
  .top-nav {
    z-index: 10;
    text-align: center;
    padding: 15px 0px 0px 0px;
    margin-left: 175px;
    a {
      padding:0em 2.5vw;
    }
  }

  img {
    position:fixed;
    float:left;
    margin-left:5vw;
    margin-top:10px;
    cursor: pointer;
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
  .standard-nav {
    img {
      position:fixed;
      float:left;
      margin-left:5vw;
      margin-top:5px;
    }
    @media (min-width : 1024px) {
      display: block;
    }
    @media (max-width : 1023px) {
      display: none;
    }
  }
  .burger-nav {
    a {
      padding:0em 2.5vw;
    }
    @media (min-width : 1024px) {
      display: none;
    }
    @media (max-width : 1023px) {
      display: block;
    }
    img {
      position: static;
      margin: 0 0 20px;
    }
  }
  .top-nav {
    z-index: 10;
    text-align: center;
    padding: 15px 0px 0px 0px;
    margin-left: 175px;
    a {
      padding:0em 2.5vw;
    }
  }
`;

const StyledLogo = styled.img`
  width:150px;
  display: block;
`;

const BurgerMenuStyles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: 'calc(50% - 18px)',
        top: '23px',
    },
    bmBurgerBars: {
        background: colors.blue_header,
    },
    bmBurgerBarsHover: {
        background: '#a90000',
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
    },
    bmCross: {
        background: colors.red_highlight,
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
    },
    bmMenu: {
        background: 'white',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        Zindex: '999',
    },
    bmMorphShape: {
        fill: '#373a47',
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column',
    },
    bmItem: {
        display: 'inline-block',
        outline: 'none',
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
    },
};

const HeaderNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <StyledNav className="header-nav">
            <div className="standard-nav">
                <Link to="/">
                    <StyledLogo src={logo} alt="logo" />
                </Link>
                <nav className="links">
                    <Link to="/documentation/">Documentation</Link>
                    <Link to="/drugs/">Drugs</Link>
                    <Link to="/genes/">Genes</Link>
                    <Link to="/datasets/">Datasets</Link>
                    <Link to="/pathways/">Pathways</Link>
                    <Link to="/contact/">Contact</Link>
                </nav>
            </div>
            <div className="burger-nav">
                <Menu
                    styles={BurgerMenuStyles}
                    right
                    isOpen={menuOpen}
                    onStateChange={(state) => setMenuOpen(state.isOpen)}
                >
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        <StyledLogo src={logo} alt="logo" />
                    </Link>
                    <Link
                        to="/documentation/"
                        onClick={() => setMenuOpen(false)}
                    >
                      Documentation
                    </Link>
                    <Link
                        to="/drugs/"
                        onClick={() => setMenuOpen(false)}
                    >
                      Drugs
                    </Link>
                    <Link
                        to="/genes/"
                        onClick={() => setMenuOpen(false)}
                    >
                      Genes
                    </Link>
                    <Link
                        to="/datasets/"
                        onClick={() => setMenuOpen(false)}
                    >
                      Datasets
                    </Link>
                    <Link
                        to="/pathways/"
                        onClick={() => setMenuOpen(false)}
                    >
                     Pathways
                    </Link>
                    <Link
                        to="/contact/"
                        onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </Link>
                </Menu>
            </div>
        </StyledNav>
    );
};


export default HeaderNav;
