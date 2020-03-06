/* eslint-disable func-names */
const knex = require('../../db/knex');

const getExperiments = function (request, response) {
    let {
        drugId, geneId,
    } = request.query;
    drugId = drugId && parseInt(drugId, 10);
    geneId = geneId && geneId.split(',').map((item) => parseInt(item, 10));
    // get experiment information
    knex.select('time', 'expression', 'dose', 'replicate', 'd.name')
        .from('drug_gene_response AS dgr')
        .innerJoin('samples AS s', 's.id', 'dgr.sample_id')
        .innerJoin('datasets_samples AS ds', 'dgr.sample_id', 'ds.sample_id')
        .innerJoin('datasets AS d', 'ds.dataset_id', 'd.id')
        .where( 's.drug_id', drugId)
        // .whereIn('s.drug_id', [drugId, 232])
        .whereIn('dgr.gene_id', geneId)
        // .orderBy('d.name', 'desc')
        .then((experiment) => response.status(200).json({
            status: 'success',
            data: experiment,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from experiments table, getExperiments',
            data: error,
        }));
};

const getControl = function(request, response) {
    knex.select('time', 'expression', 'dose', 'replicate', 'd.name')
        .from('drug_gene_response AS dgr')
        .innerJoin('samples AS s', 's.id', 'dgr.sample_id')
        .innerJoin('datasets_samples AS ds', 'dgr.sample_id', 'ds.sample_id')
        .innerJoin('datasets AS d', 'ds.dataset_id', 'd.id')
        .where( {'s.drug_id': 232, 'dgr.gene_id': 27541})
        .then((experiment) => {
            response.status(200).json({
                status: 'success',
                data: experiment,
            })
        })
        .catch((error) => response.status(500).json({
            status: 'could not find data from experiments table, getControl',
            data: error,
        }));
}

// const getAnalysis = function (request, response) {
//     let {
//         drugId, geneId,
//     } = request.query;

//     drugId = drugId && parseInt(drugId, 10);
//     geneId = geneId && parseInt(geneId, 10);

//     if (geneId != null) {
//         // get analysis information for drug
//         knex.select('fdr', 'p_value', 'fold_change')
//             .from('analysis')
//             .innerJoin("drug_gene_response AS dgr", "analysis.id", "dgr.analysis_id")
//             .where({ "gene_id": geneId})
//             .then((analysis) => response.status(200).json({
//                 status: 'success',
//                 data: analysis,
//             }))
//             .catch((error) => response.status(500).json({
//                 status: 'could not find data from analysis table, getAnalysis',
//                 data: error,
//             }));
//     } else if (drugId != null) {
//         // get analysis information for gene
//         knex.distinct('fdr', 'p_value', 'fold_change')
//             .from('analysis')
//             .innerJoin("drug_gene_response AS dgr", "analysis.id", "dgr.analysis_id")
//             .innerJoin("samples", "samples.id", "dgr.sample_id")
//             .where({ "drug_id": drugId})
//             .then((analysis) => response.status(200).json({
//                 status: 'success',
//                 data: analysis,
//             }))
//             .catch((error) => response.status(500).json({
//                 status: 'could not find data from analysis table, getAnalysis',
//                 data: error,
//             }));

//     }


// };


module.exports = {
    getExperiments, getControl
};
