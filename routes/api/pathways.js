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
const getPathwaysPerDatasetBasedOnDrugs = function (request, response) {
    const { drugName } = request.body;
    const { datasetName } = request.body;

    knex.select('pathways.id', 'pathways.name')
        .from('pathways_drugs')
        .distinct()
        .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
        .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
        .innerJoin('pathways', 'pathways.id', 'pathways_drugs.pathway_id')
        .where('datasets.name', datasetName)
        .whereIn('drugs.name', drugName)
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
// const getPathwayStatsPerDataset = function (request, response) {
//     const { datasetName } = request.body;

//     knex.select('stat_dis', 'p_value', 'fdr', 'drugs.name as drug', 'pathways.name as pathway')
//         .from('pathway_stats')
//         .innerJoin('pathways_drugs', 'pathways_drugs.id', 'pathway_stats.id')
//         .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
//         .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
//         .innerJoin('pathways', 'pathways.id', 'pathways_drugs.pathway_id')
//         .where('datasets.name', datasetName)
//         .orderBy('drugs.name')
//         .orderBy('pathways.name')
//         .then((stats) => response.status(200).json({
//             status: 'success',
//             data: stats,
//         }))
//         .catch((error) => response.status(500).json({
//             status: 'could not find data from pathway stats table, getPathwayStatsPerDataset',
//             data: error,
//         }));
// };


// get the pathway stats based on the dataset and pathways.
const getPathwayStatsPerDataset = function (request, response) {
    const { datasetName } = request.body;
    const { pathways } = request.body;
    const { ontology } = request.body;
    const { drugs } = request.body;


    knex.select('stat_dis', 'p_value', 'fdr', 'drugs.name as drug', 'pathways.name as pathway', 'drug_annotations.carcinogenicity', 'drug_annotations.class_in_vivo')
        .from('pathway_stats')
        .innerJoin('pathways_drugs', 'pathways_drugs.id', 'pathway_stats.id')
        .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
        .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
        .innerJoin('drug_annotations', 'drugs.id', 'drug_annotations.drug_id')
        .innerJoin('pathways', 'pathways.id', 'pathways_drugs.pathway_id')
        .where('datasets.name', datasetName)
        .andWhere('pathway_stats.ontology', ontology)
        .where((drug) => {
            if (drugs.length === 0) {
                drug.where('drugs.name', 'like', '%');
            } else {
                drug.whereIn('drugs.name', drugs);
            }
        })
        .whereIn('pathways.name', pathways)
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

// get the drugs from pathways_drugs table based upon the dataset.
const getDrugsPerDataset = function (request, response) {
    const { datasetName } = request.body;

    // get the drugs based on the dataset name.
    knex.select('drugs.id', 'drugs.name', 'drug_annotations.carcinogenicity', 'drug_annotations.class_in_vivo')
        .distinct()
        .from('pathways_drugs')
        .innerJoin('drugs', 'drugs.id', 'pathways_drugs.drug_id')
        .innerJoin('drug_annotations', 'drugs.id', 'drug_annotations.drug_id')
        .innerJoin('datasets', 'datasets.id', 'pathways_drugs.dataset_id')
        .where('datasets.name', datasetName)
        .then((drugs) => response.status(200).json({
            status: 'success',
            data: drugs,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugsPerDataset',
            data: error,
        }));
};


module.exports = {
    getPathways,
    getPathwaysPerDatasetBasedOnDrugs,
    getPathwayStatsPerDataset,
    getDrugsPerDataset,
};
