import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import Landing from './Landing';
import Genes from './SummaryPages/Genes';
import Datasets from './SummaryPages/Datasets';
import Drugs from './SummaryPages/Drugs';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';
import Documentation from './SummaryPages/Documentation';
import DrugCard from './IndivPages/DrugPage';
import GeneCard from './IndivPages/GenePage';
import GlobalStyles from '../styles/GlobalStyles';

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
  <>
    <Normalize />
    <GlobalStyles />
    <StyledApp className="app">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/genes/" component={Genes} />
        <Route exact path="/drugs/" component={Drugs} />
          {/* <Route exact path="/datasets/" component={Datasets} /> */}
          {/* <Route exact path="/documentation/" component={Documentation} /> */}
        <Route path="/drugs/:id" component={DrugCard} />      
        <Route path="/genes/:id" component={GeneCard} />   
        {/* <Route path="/expression" component={ExpressionPlot} */}
      </Switch>
    </StyledApp>
    <HeaderNav />
    <FooterNav/>
  </>
);

export default App;
