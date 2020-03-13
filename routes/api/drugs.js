/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the drugs table.
const getDrugs = (request, response) => {
    knex.select('id', 'name', 'pubchem', 'chembl', 'drugbank', 'carcinogenicity', 'class_in_vitro', 'class_in_vivo', 'targets', 'class_name', 'smiles', 'inchikey')
        .from('drugs')
        .leftJoin(
            'drug_annotations',
            'drugs.id',
            'drug_annotations.drug_id',
        )
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
};

const getIndivDrug = (request, response) => {
    knex.select('id', 'name', 'pubchem', 'chembl', 'drugbank', 'carcinogenicity', 'class_in_vitro', 'class_in_vivo', 'targets', 'class_name', 'smiles', 'inchikey')
        .from('drugs')
        .leftJoin(
            'drug_annotations',
            'drugs.id',
            'drug_annotations.drug_id',
        )
        .where({ 'drugs.id': request.params.id })
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
};

const getDrugAnalysis = (request, response) => {
    function subquerySamples() {
        return this.select('id as sample_id')
            .from('samples')
            .where({ drug_id: request.params.id })
            .as('S');
    }
    function subqueryAnalysis() {
        return this.select('fdr', 'fold_change', 'p_value', 'id')
            .from('analysis')
            .whereNot({ id: 0 })
            .as('A');
    }
    function subqueryDatasets() {
        return this.select()
            .from('datasets_samples')
            // just removes drugMatrix dataset
            // .whereNot({ dataset_id: 3 })
            .as('ds');
    }
    knex.distinct('fdr', 'fold_change', 'p_value', 'genes.id AS gene_id', 'ga.symbol AS gene_name', 'datasets.name AS dataset_name')
        .from(subquerySamples)
        .innerJoin('drug_gene_response AS dgr', 'S.sample_id', 'dgr.sample_id')
        .innerJoin(subqueryAnalysis, 'A.id', 'dgr.analysis_id')
        .innerJoin('genes', 'dgr.gene_id', 'genes.id')
        .innerJoin('gene_annotations AS ga', 'genes.id', 'ga.gene_id')
        .innerJoin(subqueryDatasets, 'S.sample_id', 'ds.sample_id')
        .innerJoin('datasets', 'ds.dataset_id', 'datasets.id')
        .then((analysis) => response.status(200).json({
            status: 'success',
            data: analysis,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from analysis table, getDrugAnalysis',
            data: error,
        }));
};


const getDrugsPerDataset = (request, response) => {
    const { id: dataset } = request.body;
    // get the drugs based on the dataset name.
    knex.select('drugs.id', 'drugs.name')
        .from('drugs_datasets')
        .innerJoin('drugs', 'drugs.id', 'drugs_datasets.drug_id')
        .innerJoin('datasets', 'datasets.id', 'drugs_datasets.dataset_id')
        .where('datasets.name', dataset)
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
    getDrugs,
    getIndivDrug,
    getDrugAnalysis,
    getDrugsPerDataset,
};
