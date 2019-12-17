/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the cells table.
const getCells = function (request, response) {
    knex.select()
        .from('cells')
        .then((cell) => response.status(200).json({
            status: 'success',
            data: cell,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from tissues table, getCells',
            data: error,
        }));
};


module.exports = {
    getCells,
};
