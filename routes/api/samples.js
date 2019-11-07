/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the samples table.
const getSamples = function (request, response) {
    knex.select()
        .from('samples')
        .then((sample) => response.status(200).json({
            status: 'success',
            data: sample,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from samples table, getSamples',
            data: error,
        }));
};


module.exports = {
    getSamples,
};
