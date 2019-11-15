/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the drugs table.
const getDrugs = (request, response) => {
    knex.select('id', 'name', 'pubchem', 'chembl', 'drugbank', 'targets', 'class', 'class_name', 'atc_code')
        .from('drugs')
        .leftJoin(
            'drug_annotations',
            'drugs.id',
            'drug_annotations.drug_id',
        )
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
};

const getIndivDrug = (request, response) => {
    knex.select('name', 'pubchem', 'chembl', 'drugbank', 'targets', 'class', 'class_name', 'atc_code')
        .from('drugs')
        .leftJoin(
            'drug_annotations',
            'drugs.id',
            'drug_annotations.drug_id',
        )
        .where({ "drugs.id": request.params.id })
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
}


module.exports = {
    getDrugs, getIndivDrug
};
