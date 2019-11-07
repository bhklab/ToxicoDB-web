/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the pathways table.
const getPathways = function (request, response) {
    knex.select()
        .from('pathways')
        .then((pathway) => response.status(200).json({
            status: 'success',
            data: pathway,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from pathways table, getPathways',
            data: error,
        }));
};


module.exports = {
    getPathways,
};
