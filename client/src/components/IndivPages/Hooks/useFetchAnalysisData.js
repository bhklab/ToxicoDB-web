import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnalysisData = (url) => {
    const [{
        analysisData,
        loading,
        //   filteredData
    }, setAnalysisData] = useState({
        analysisData: [],
        loading: true,
        //   filteredData: [],
    });
    useEffect(() => {
        setAnalysisData({
            analysisData: [],
            loading: true,
            //  filteredData: []
        });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const updatedData = data.filter((item) => parseFloat(item.p_value) !== 0 && item.dataset_name !== 'drugMatrix');
                setAnalysisData({
                    analysisData: updatedData,
                    loading: false,
                    // filteredData: updatedData,
                });
            });
    }, [url]);

    return [{
        analysisData,
        loading,
        //   filteredData
    }, setAnalysisData];
};

export default useFetchAnalysisData;
