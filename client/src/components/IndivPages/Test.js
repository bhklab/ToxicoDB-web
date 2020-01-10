import React from 'react';

const someFunction = (props) => {
    const { data } = props;
    return (
        <div>
            {data.length === 0 && datasetsShown.length === 0 ? null : (
                <div>
                    <DatasetSelect />
                    <div>
                        { datasetsShown.map((x, i) => (
                            <VolcanoSingle // Plotly
                                key={i}
                                data={data[x]} // fullData
                                queryId={queryId}
                                plotId="volcanoPlot"
                                type={type}
                            />
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};
