import { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchGeneNameArray = (data) => {
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        // const newDataIter = [];
        // if (data.length !== 0) {
        //     setNewData([]);
        //     data.forEach((d, i) => {
        //         newDataIter.push(d);
        //         if (d.entrez_gid.length !== 0) {
        //             fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=${d.entrez_gid[0]}`)
        //                 .then((response) => response.json())
        //                 .then((res) => {
        //                     const { result } = res;
        //                     if (d.entrez_gid.length === 1) { // if only one entrez id provided
        //                         newDataIter[i].full_name = result[d.entrez_gid[0]].description;
        //                     } else {
        //                         fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=${d.entrez_gid[1]}`)
        //                             .then((response) => response.json())
        //                             .then((res2) => {
        //                                 newDataIter[i].full_name = `${result[d.entrez_gid[0]].description}, ${res2.result[d.entrez_gid[1]].description}`;
        //                             });
        //                     }
        //                 });
        //         } else {
        //             newDataIter[i].full_name = ' ';
        //         }
        //     });
        // }
        // setNewData(newDataIter);
    }, [data]);

    return newData;
};

export default useFetchGeneNameArray;
