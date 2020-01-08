import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnnotation = (url) => {
    const [{ geneData, annotationData }, setGeneData] = useState({
        geneData: [], annotationData: [],
    });

    console.log('useFetchAnnotation');
    useEffect(() => {
        setGeneData({ geneData: [], annotationData: [] });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const annotationArray = [];
                Object.keys(data[0]).forEach((x) => {
                    if (x !== 'id' && x !== 'ensembl_tid') {
                        const temp = {
                            name: x,
                            value: data[0][x],
                        };
                        annotationArray.push(temp);
                    }
                });
                setGeneData({ geneData: data[0], annotationData: annotationArray });
            });
    }, [url]);


    return { geneData, annotationData };
};

export default useFetchAnnotation;
