import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchGeneName = (entrez_gid) => {
    const [{
        name,
    }, setName] = useState({
        name: [],
    });
    useEffect(() => {
        if (entrez_gid.length !== 0) {
            setName({
                name: [],
            });
            fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=${entrez_gid[0]}`)
                .then((response) => response.json())
                .then((res) => {
                    const { result } = res;
                    if (entrez_gid.length === 1) { // if only one entrez id provided
                        setName({
                            name: [result[entrez_gid[0]].description],
                        });
                    } else {
                        fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=${entrez_gid[1]}`)
                            .then((response) => response.json())
                            .then((res2) => {
                                setName({
                                    name: [result[entrez_gid[0]].description, res2.result[entrez_gid[1]].description],
                                });
                            });
                    }
                });
        }
    }, [entrez_gid]);

    return {
        name,
    };
};

export default useFetchGeneName;
