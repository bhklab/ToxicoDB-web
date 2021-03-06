import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../images/toxicodb-logo.png';
import colors from '../styles/colors';

const StyledNav = styled.div`   
    width: 100%;
    bottom:0px;
    margin-bottom:-10px;
    right:0px;
    padding: 20px 0;
    white-space:nowrap;
    background-color: ${colors.lightblue_bg};
    font-size: calc(0.8em + 0.2vw);
    font-family: 'Raleway', sans-serif;
    display:flex;
    align-items:center;
    justify-content: center;

    
    .container {
        width:80vw;
        display:flex;
        @media (max-width : 500px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
    }

    h3 {
        color: ${colors.red_highlight};
        margin-bottom:10px;
    }

    .links {
        width:200px;
        a {
            color: ${colors.blue_header};
            display: block;
            margin-bottom:10px;
        }
    }
    .database {
        flex-grow:1;
    }
    .support {
        flex-grow:1;
    }
    .contact {
        background:white;
        flex-grow:1;
        text-align:center;
        color: ${colors.blue_header};
        line-height:25px;
        border-radius:25px;
        font-size: calc(0.7em + 0.2vw);
        h3 {
            margin:15px 0 5px 0;
        }
    }
    .logo {
        width: 50px;
    }
  
}
`;

const FooterNav = () => (
    <StyledNav className="footer-nav">
        <div className="container">
            <div className="database links">
                <h3>Database</h3>
                <Link to="/compounds">Compounds</Link>
                <Link to="/genes">Genes</Link>
                <Link to="/datasets">Datasets</Link>
            </div>
            <div className="support links">
                <h3>Support</h3>
                <Link to="/documentation">Documentation</Link>
                <a href="https://github.com/bhklab">GitHub</a>
                <a href="https://bhklab.ca/">BHKLab</a>
            </div>
            {/* <div className="contact">
                <h3>BHKLab</h3>
                    The MaRS center
                <br />
                    101 College St, Toronto ON
                {' '}
                <br />
                    TMDT RM 11-310
            </div> */}
        </div>
    </StyledNav>
);


export default FooterNav;
