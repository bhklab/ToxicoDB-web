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
                console.log(res);
            });
    }, [url]);

    return { geneData, annotationData };
};

export default useFetchAnnotation;
