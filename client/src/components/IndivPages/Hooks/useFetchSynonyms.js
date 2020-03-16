import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchSynonyms = (url, type) => {
    const [synonymData, setSynonymData] = useState([]);

    useEffect(() => {
        setSynonymData();
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                const { data } = res;
                setSynonymData(data)
            });
    }, [url]);


    return { synonymData };
};

export default useFetchSynonyms;
