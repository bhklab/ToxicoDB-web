import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchGeneName = (entrez_gid) => {
    const [{
        name
    }, setName] = useState({
        name: '',
    });
    useEffect(() => {
        if (entrez_gid !== 0) {
            setName({
                name: ''
            });
            fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=${entrez_gid}`)
                .then((response) => response.json())
                .then((res) => {
                    const { result } = res;
                    setName({
                        name: result[entrez_gid].description
                    });
                });
        }
    }, [entrez_gid]);

    return {
        name
    };
};

export default useFetchGeneName;
