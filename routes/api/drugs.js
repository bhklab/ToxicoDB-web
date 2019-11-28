/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the drugs table.
const getDrugs = (request, response) => {
    knex.select('id', 'name', 'pubchem', 'chembl', 'drugbank', 'targets', 'class', 'class_name', 'atc_code')
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
    knex.select('id','name', 'pubchem', 'chembl', 'drugbank', 'carcinogenicity', 'class_in_vitro', 'class_in_vivo', 'targets', 'class', 'class_name', 'atc_code')
        .from('drugs')
        .leftJoin(
            'drug_annotations',
            'drugs.id',
            'drug_annotations.drug_id',
        )
        .where({ "drugs.id": request.params.id })
        .then((drug) => response.status(200).json({
            status: 'success',
            data: drug,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from drugs table, getDrugs',
            data: error,
        }));
}

const getDrugAnalysis = (request, response) => {
    knex.distinct("fdr", "fold_change", "p_value", "genes.id AS gene_id", "genes.name AS gene_name", "datasets.name AS dataset_name")
        .from("analysis")
        .innerJoin("drug_gene_response AS dgr", "analysis.id", "dgr.analysis_id")
        .innerJoin("samples", "samples.id", "dgr.sample_id")
        .innerJoin("genes", "dgr.gene_id", "genes.id")
        .innerJoin("datasets_samples AS ds", "samples.id", "ds.sample_id")
        .innerJoin("datasets", "ds.dataset_id", "datasets.id")
        .where({"drug_id": request.params.id})
    .then((analysis) => response.status(200).json({
        status: 'success',
        data: analysis,
    }))
    .catch((error) => response.status(500).json({
        status: 'could not find data from analysis table, getDrugAnalysis',
        data: error,
    }));
}
    
module.exports = {
    getDrugs, getIndivDrug, getDrugAnalysis
};
