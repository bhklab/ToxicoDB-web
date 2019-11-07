import { createGlobalStyle } from 'styled-components';
import colors from './colors';


const GlobalStyles = createGlobalStyle`
    .ReactTable {
        width: 100%;
        text-align: left;
        margin: 10px 0;
        color:blue;
        font-family: Nunito Sans, sans-serif;

        .rt-thead.-header,
        .raw-names,
        .header-name {
            box-shadow:none !important;
            font-weight: 700;
            font-size: 18px;
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
            background: blue;
            color:white !important;
        }

        
        input {
            background: blue !important;
        }
    }
`;

export default GlobalStyles;
