/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the tissues table.
const getTissues = function (request, response) {
    knex.select()
        .from('tissues')
        .then((tissue) => response.status(200).json({
            status: 'success',
            data: tissue,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from tissues table, getTissues',
            data: error,
        }));
};


module.exports = {
    getTissues,
};
