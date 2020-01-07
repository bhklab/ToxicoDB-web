import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnalysisData = (url) => {
    console.log('useFetchAnalysisData');
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
            });
    }, [url]);
};

export default useFetchAnalysisData;
