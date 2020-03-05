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

// get the pathways based on dataset and drug.
const getPathwaysPerDatasetDrug = function (request, response) {
    const { drugName } = request.body;
    const { datasetName } = request.body;

    knex.select()
        .from('pathways_drugs')
        .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
        .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
        .innerJoin('pathways', 'pathways.id', 'pathways_drugs.pathway_id')
        .where('datasets.name', datasetName)
        .andWhere('drugs.name', drugName)
        .then((pathways) => response.status(200).json({
            status: 'success',
            data: pathways,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from pathways table, getPathwaysPerDatasetDrug',
            data: error,
        }));
};

// get the pathway stats based on the dataset.
const getPathwayStatsPerDataset = function (request, response) {
    const { datasetName } = request.body;

    knex.select('stat_dis', 'p_value', 'fdr', 'drugs.name as drug', 'pathways.name as pathway')
        .from('pathway_stats')
        .innerJoin('pathways_drugs', 'pathways_drugs.id', 'pathway_stats.id')
        .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
        .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
        .innerJoin('pathways', 'pathways.id', 'pathways_drugs.pathway_id')
        .where('datasets.name', datasetName)
        .orderBy('drugs.name')
        .orderBy('pathways.name')
        .then((stats) => response.status(200).json({
            status: 'success',
            data: stats,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from pathway stats table, getPathwayStatsPerDataset',
            data: error,
        }));
};

module.exports = {
    getPathways,
    getPathwaysPerDatasetDrug,
    getPathwayStatsPerDataset,
};
