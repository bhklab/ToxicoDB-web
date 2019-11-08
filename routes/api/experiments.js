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

    // get the drug's dataset so i can make sure in the front-end 
    // how to parse the concentration values
    function getDatasetFromDrug() {
        knex.select('dataset_id')
            .from('drugs_datasets')
            .where({drug_id: drugId});
    }
    // TODO: get the gene's dataset
    function getDatasetFromGene() {}

    // get experiment id
    function getExperimentId() {
        knex.select('id')
            .from('experiment')
            .where({ drug_id: drugId, gene_id: geneId });
    }

    // get experiment information
    knex.select('time', 'expression', 'concentration', 'replicate_id')
        .from('drug_gene_response')
        .where({ experiment_id: getExperimentId });
};


module.exports = {
    getExperiments,
};
