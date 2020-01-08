import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnalysisData = (url) => {
    const [{ analysisData, loading }, setAnalysisData] = useState({
        analysisData: [], loading: true,
    });
    useEffect(() => {
        setAnalysisData({ volcanoData: [], analysisData: [], loading: true });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const filteredData = data.filter((item) => parseFloat(item.p_value) !== 0 && item.dataset_name !== 'drugMatrix');
                setAnalysisData({ analysisData: filteredData, loading: false });
            });
    }, [url]);

    return { analysisData, loading };
};

export default useFetchAnalysisData;
