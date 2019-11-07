/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the genes table.
const getGenes = function (request, response) {
    knex.select('id', 'name', 'entrez_id', 'hgnc_id')
        .from('genes')
        .leftJoin(
            'gene_annotations',
            'genes.id',
            'gene_annotations.gene_id',
        )
        .then((gene) => response.status(200).json({
            status: 'success',
            data: gene,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from genes table, getGenes',
            data: error,
        }));
};


module.exports = {
    getGenes,
};
