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
    knex.select('time', 'expression', 'dose', 'replicate', "d.name")
        .from('drug_gene_response AS dgr')
        .innerJoin("samples AS s", "s.id", "dgr.sample_id")
        .innerJoin("datasets_samples AS ds", "dgr.sample_id", "ds.sample_id")
        .innerJoin("datasets AS d", "ds.dataset_id", "d.id")
        .where({ "s.drug_id": drugId, "dgr.gene_id":geneId })
        .then((experiment) => response.status(200).json({
            status: 'success',
            data: experiment,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from experiments table, getExperiments',
            data: error,
        }));
};


module.exports = {
    getExperiments,
};
