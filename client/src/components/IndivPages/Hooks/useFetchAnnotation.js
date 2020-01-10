import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnnotation = (url, type) => {
    const [{ apiData, annotationData }, setGeneData] = useState({
        apiData: [], annotationData: [],
    });
    useEffect(() => {
        setGeneData({ apiData: [], annotationData: [] });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                console.log(data);
                const annotationArray = [];
                Object.keys(data[0]).forEach((x) => {
                    if ((type === 'gene' && x !== 'id' && x !== 'ensembl_tid')
                    || (type === 'drug' && x !== 'name' && x !== 'id')) {
                        const temp = {
                            name: x,
                            value: data[0][x],
                        };
                        annotationArray.push(temp);
                    }
                });
                console.log(annotationArray);
                setGeneData({ apiData: data[0], annotationData: annotationArray });
            });
    }, [url]);


    return { apiData, annotationData };
};

export default useFetchAnnotation;
