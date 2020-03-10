import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import GlobalStyles from '../styles/GlobalStyles';
import Landing from './Landing';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';

const Genes = lazy(() => import('./SummaryPages/Genes'));
const Drugs = lazy(() => import('./SummaryPages/Drugs'));
const Datasets = lazy(() => import('./SummaryPages/Datasets'));
const Cells = lazy(() => import('./SummaryPages/Cells'));
const Tissues = lazy(() => import('./SummaryPages/Tissues'));
const Species = lazy(() => import('./SummaryPages/Species'));
const Documentation = lazy(() => import('./Documentation/MainDocument'));
const DrugCard = lazy(() => import('./IndivPages/DrugPage'));
const GeneCard = lazy(() => import('./IndivPages/GenePage'));
const DatasetCard = lazy(() => import('./IndivPages/DatasetPage'));
const ExpressionPlot = lazy(() => import('./ExpressionPlot'));
const BarChart = lazy(() => import('./Plots/BarChat'));
const Pathways = lazy(() => import('./SummaryPages/Pathways'));
const Contact = lazy(() => import('./Contact'));

const StyledApp = styled.div`
    margin: 20px auto 0px auto;
    min-height:100vh;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: flex-start;    

    flex-grow: 1;
    font-family: 'Raleway', sans-serif;

    order:2;
    z-index:1;
`;

// justify-content: space-around;
//     align-items: center;

const App = () => (
    <div>
        <Normalize />
        <GlobalStyles />
        <StyledApp className="app">
            <Switch>
                <Suspense fallback={<div />}>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/genes/" component={Genes} />
                    <Route exact path="/drugs/" component={Drugs} />
                    <Route exact path="/datasets/" component={Datasets} />
                    <Route exact path="/cells/" component={Cells} />
                    <Route exact path="/species/" component={Species} />
                    <Route exact path="/tissues/" component={Tissues} />
                    <Route exact path="/pathways" component={Pathways} />
                    <Route exact path="/contact/" component={Contact} />
                    <Route exact path="/documentation/" component={Documentation} />
                    <Route path="/drugs/:id" component={DrugCard} />
                    <Route path="/genes/:id" component={GeneCard} />
                    <Route path="/datasets/:id" component={DatasetCard} />
                    <Route path="/expression" component={ExpressionPlot} />
                    <Route path="/bar" component={BarChart} />

                </Suspense>
            </Switch>
        </StyledApp>
        <HeaderNav />
        {/* <FooterNav /> */}
    </div>
);

export default App;
