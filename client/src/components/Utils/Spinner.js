import React from 'react';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: auto;
    margin-top: 300px;
`;


const SpinnerUtil = (props) => {
    const { loading } = props;
    return loading ? (
        <div style={{ height: '500px', width: '1300px' }}>
            <DotLoader
                css={override}
                sizeUnit="px"
                size={80}
                color="#0c699e"
            />
        </div>
    ) : (<div />);
};

export default SpinnerUtil;
