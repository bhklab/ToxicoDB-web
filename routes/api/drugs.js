/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the drugs table.
const getdrugs = (request, response) => {
    knex.select()
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
            status: 'could not find data from drugs table, getdrugs',
            data: error,
        }));
};


module.exports = {
    getdrugs,
};
