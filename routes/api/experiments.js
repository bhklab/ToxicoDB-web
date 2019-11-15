/* eslint-disable func-names */
const knex = require('../../db/knex');

const getExperiments = function (request, response) {
    let {
        drugId, geneId,
    } = request.query;

    drugId = drugId && parseInt(drugId, 10);
    geneId = geneId && parseInt(geneId, 10);
    // knex.select()
    //     .from('drug_gene_response')
    //     .then((data) => response.status(200).json({
    //         status: 'success',
    //         data: data,
    //     }))
    //     .catch((error) => response.status(500).json({
    //         status: 'could not find data from experiments table, getExperiments',
    //         data: error,
    //     }));

    // get experiment information
    knex.select('time', 'expression', 'dose', 'replicate')
        .from('drug_gene_response AS dgr')
        .innerJoin("samples AS s", "s.id", "dgr.sample_id")
        .where({ "s.drug_id": drugId, "dgr.gene_id":geneId });
};


module.exports = {
    getExperiments,
};
