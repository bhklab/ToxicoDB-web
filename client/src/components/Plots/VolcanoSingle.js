/* eslint-disable radix */
import React, {
    useState, useEffect,
} from 'react';
import styled from 'styled-components';
// import { Canvas } from 'react-canvas-js';
// import colors from '../../styles/colors';
import { CanvasJSChart } from '../../lib/canvasjs.react';


const StyledDiv = styled.div`
    min-height: 600px;    
    width: 100%;    

    h3 {
        text-align: center;
    }
    .js-plotly-plot {
        width: 100%;
    }
    .scatterpts {
        opacity: 0;
    }

`;


// for clicking on the points
const click = (e, type, queryId) => {
    const id = parseInt(e.dataPoints.id);
    if (type === 'drug') {
        document.location.href = `/expression?compoundId=${queryId}&geneId=${id}`;
    } else {
        document.location.href = `/expression?compoundId=${id}&geneId=${queryId}`;
    }
};

const VolcanoSingle = (props) => {
    const [state, setState] = useState({
        layout: null,
        options: null,
        class: null,
        // loading: false,
    });

    const {
        data, type, queryId, datasetName, plotId, selected,
    } = props;

    const formatData = (data) => {
        // setting up the traces; can't really deep copy
        const greenTrace = {
            showInLegend: false,
            type: 'scatter',
            click: (e) => click(e, type, queryId),
            dataPoints: [],
            color: '#5cc33c',
        };

        const blueTrace = {
            showInLegend: false,
            type: 'scatter',
            click: (e) => click(e, type, queryId),
            dataPoints: [],
            color: '#e1f1fb',
        };

        // calculate lowest pvalue that isn't 0, -log10 it, and set all 0s to the cutoff
        const cutoff = -Math.log10(Math.min(...data.map((x) => (parseFloat(x.p_value) === 0 ? null : parseFloat(x.p_value))).filter((x) => x !== null)));

        // putting data in
        data.forEach((d) => {
            if (parseFloat(d.p_value) <= 0.05) {
                const temp = {};
                temp.x = (d.fold_change);
                temp.y = (parseFloat(d.p_value) === 0 ? cutoff : -Math.log10(d.p_value));
                temp.id = d.gene_id || d.drug_id;
                temp.name = d.gene_name || d.drug_name;
                // green
                if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) >= 1) {
                    greenTrace.dataPoints.push(temp);
                }
                // blue
                else if (parseFloat(d.fdr) < 0.05 && Math.abs(d.fold_change) < 1) {
                    blueTrace.dataPoints.push(temp);
                }
            }
        });

        // if dataset is not selected, give class hidden to hide
        const className = selected.includes(datasetName) ? 'plot' : 'plot hidden';

        setState({
            ...state,
            options: {
                axisY: { title: '-log10(p value)', labelFontFamily: 'Arial', labelFontSize: 12 },
                axisX: {
                    title: 'log2(fold change)', labelFontFamily: 'Arial', labelFontSize: 12, zeroline: false,
                },
                tooltip: {
                    content: '{name}',
                },
                data: [greenTrace, blueTrace],
            },
            class: className,
            loaded: true,
        });
    };

    // initial render - like a componentdidmount, only runs once
    useEffect(() => {
        setState({
            ...state,
            options: null,
            class: null,
            loaded: false,
        });
        formatData(data);
    }, []);

    // determining if selected changes
    useEffect(() => {
        setState({
            ...state,
            options: null,
            class: null,
            loaded: false,
        });
        formatData(data);
    }, [selected]);


    return (
        <StyledDiv className={state.class}>
            <h3>
                {(datasetName === 'TGGATEsHuman') ? 'TGGATEs Human'
                    : (datasetName === 'TGGATEsRat') ? 'TGGATEs Rat'
                        : (datasetName === 'DrugMatrix') ? 'DrugMatrix'
                            : datasetName}

            </h3>
            {state.loaded ? (
                <div>
                    <CanvasJSChart
                        options={state.options}
                    />
                    {console.log(state.options)}
                </div>
            ) : null}
        </StyledDiv>
    );
};

export default VolcanoSingle;
