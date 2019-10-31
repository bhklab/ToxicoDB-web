/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the datasets table.
const getDatasets = function (request, response) {
    knex.select()
        .from('datasets')
        .then((dataset) => response.status(200).json({
            status: 'success',
            data: dataset,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from datasets table, getDatasets',
            data: error,
        }));
};


module.exports = {
    getDatasets,
};
