/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the species table.
const getSpecies = function (request, response) {
    knex
        .distinct('name')
        .from('species')
        .then((cell) => response.status(200).json({
            status: 'success',
            data: cell,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from species table, getSpecies',
            data: error,
        }));
};


module.exports = {
    getSpecies,
};
