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
                const annotationArray = [];
                const annotationObj = {};
                data.forEach((item) => {
                    Object.keys(item).forEach((key, index) => {
                        if (!annotationObj[key]) {
                            annotationObj[key] = { name: key, value: [item[key]] };
                        } else {
                            annotationObj[key].value.push(item[key]);
                        }
                    });
                });
                console.log(annotationObj);
                Object.values(annotationObj).forEach((x) => {
                    const { name } = x;
                    if ((type === 'gene' && name !== 'id' && name !== 'ensembl_tid')
                    || (type === 'drug' && name !== 'name' && name !== 'id')) {
                        annotationArray.push(x);
                    }
                });
                console.log(annotationArray);
                setGeneData({ apiData: data[0], annotationData: annotationArray });
            });
    }, [url]);


    return { apiData, annotationData };
};

export default useFetchAnnotation;
