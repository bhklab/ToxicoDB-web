/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the genes table.
const getgenes = function (request, response) {
    console.log('Genes route fired');
    knex.select()
        .from('genes')
        .then((gene) => response.status(200).json({
            status: 'success',
            data: gene,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from genes table, getgenes',
            data: error,
        }));
};


module.exports = {
    getgenes,
};
