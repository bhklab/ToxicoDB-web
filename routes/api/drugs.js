/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the drugs table.
const getDrugs = function (request, response) {
    knex.select()
        .from('drugs')
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
};


module.exports = {
    getDrugs,
};
