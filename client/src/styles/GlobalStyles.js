import { createGlobalStyle } from 'styled-components';
import colors from './colors';


const GlobalStyles = createGlobalStyle`
    
    a {
        text-decoration: none;
        color: black;
        font-family: 'Raleway', sans-serif;

        &:hover {
        cursor: pointer !important;
        }
    }

    .ReactTable {
        text-align: left;
        margin: 10px 20px;
        color: ${colors.blue_header};
        font-family: 'Raleway', sans-serif;

        .rt-thead.-header,
        .raw-names,
        .header-name {
            box-shadow:none !important;
            font-weight: 700;
            font-size: 18px;
        }

        .rt-tr-group:hover {
            background-color: ${colors.lightred_bg}
        }

        .rt-thead.-header {
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        

        .pagination-bottom {
            box-shadow:none !important;
        }
        .-pagination {
            box-shadow:none !important;
            border-top:1px solid rgba(0,0,0,0.1) !important;
        }

        .-previous, .-next, .-btn   {
            background: ${colors.blue_header};
            color:white !important;
        }

        
        input {
            background: ${colors.lightblue_bg} !important;
        }
    }
`;

export default GlobalStyles;
