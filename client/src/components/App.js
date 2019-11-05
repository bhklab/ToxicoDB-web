import React, {Fragment} from 'react';
import {Route, Switch } from 'react-router-dom'
import styled from 'styled-components';
import Landing from './Landing';
import Genes from './Genes';
import Datasets from './Datasets';
import Drugs from './Drugs';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';
import Documentation from './Documentation';

const StyledApp = styled.div`
  margin: 0 auto;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  
  order:2;
  z-index:1;
`;

const App = () => {
  return (
    <Fragment>
      <StyledApp className="app"> 
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/genes/" component={Genes} />
          <Route exact path="/drugs/" component={Drugs} />
          <Route exact path="/datasets/" component={Datasets} />
          <Route exact path="/documentation/" component={Documentation} /> */}
        </Switch>
      </StyledApp>
      <HeaderNav/>
      {/* <FooterNav/> */}
    </Fragment>
  );
}

export default App;
