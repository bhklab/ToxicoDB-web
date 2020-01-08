import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnnotation = (url, type) => {
    const [{ geneData, annotationData }, setGeneData] = useState({
        geneData: [], annotationData: [],
    });
    useEffect(() => {
        setGeneData({ geneData: [], annotationData: [] });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const annotationArray = [];
                console.log(data);
                Object.keys(data[0]).forEach((x) => {
                    if ((type === 'gene' && x !== 'id' && x !== 'ensembl_tid')
                    || (type === 'drug' && x !== 'name' && x !== 'id')) {
                        const temp = {
                            name: x,
                            value: data[0][x],
                        };
                        annotationArray.push(temp);
                        console.log(annotationArray);
                    }
                });
                setGeneData({ geneData: data[0], annotationData: annotationArray });
            });
    }, [url]);


    return { geneData, annotationData };
};

export default useFetchAnnotation;
