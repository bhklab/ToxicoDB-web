import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchAnnotation = (url, type) => {
    const [{ apiData, entrez_gid, annotationData }, setGeneData] = useState({
        apiData: [], entrez_gid: [], annotationData: [],
    });

    useEffect(() => {
        setGeneData({ apiData: [], entrez_gid: [], annotationData: [] });
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                const gid = [];
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
                    gid.push(item.entrez_gid);
                });
                Object.values(annotationObj).forEach((x) => {
                    const { name } = x;
                    if ((type === 'gene' && name !== 'id' && name !== 'ensembl_tid')
                    || (type === 'drug' && name !== 'name' && name !== 'id')) {
                        annotationArray.push(x);
                    }
                });
                setGeneData({ apiData: data[0], entrez_gid: gid, annotationData: annotationArray });
            });
    }, [url]);


    return { apiData, entrez_gid, annotationData };
};

export default useFetchAnnotation;
