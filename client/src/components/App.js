import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import Landing from './Landing';
import Genes from './SummaryPages/Genes';
import Drugs from './SummaryPages/Drugs';
import Datasets from './SummaryPages/Datasets';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';
// import Documentation from './SummaryPages/Documentation';
import DrugCard from './IndivPages/DrugPage';
import GeneCard from './IndivPages/GenePage';
import DatasetCard from './IndivPages/DatasetPage';
import ExpressionPlot from './ExpressionPlot';
import GlobalStyles from '../styles/GlobalStyles';
import Species from './SummaryPages/Species';
import Cells from './SummaryPages/Cells';
import Tissues from './SummaryPages/Tissues';
import Documentation from './Documentation/MainDocument.js';


const StyledApp = styled.div`
  margin: 0 auto;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  font-family: 'Raleway', sans-serif;
  
  order:2;
  z-index:1;
`;

const App = () => (
    <div>
        <Normalize />
        <GlobalStyles />
        <StyledApp className="app">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/genes/" component={Genes} />
                <Route exact path="/drugs/" component={Drugs} />
                <Route exact path="/datasets/" component={Datasets} />
                <Route exact path="/species/" component={Species} />
                <Route exact path="/cells/" component={Cells} />
                <Route exact path="/species/" component={Species} />
                <Route exact path="/tissues/" component={Tissues} />
                <Route exact path="/documentation/" component={Documentation} />
                <Route path="/drugs/:id" component={DrugCard} />
                <Route path="/genes/:id" component={GeneCard} />
                <Route path="/datasets/:id" component={DatasetCard} />
                <Route path="/expression" component={ExpressionPlot} />
            </Switch>
        </StyledApp>
        <HeaderNav />
        <FooterNav />
    </div>
);

export default App;
