/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the genes table.

const getGenes = function (request, response) {
    knex.select('id', 'name', 'symbol', 'ensembl_tid', 'entrez_gid', 'transcript_name')
        .from('genes')
        .leftJoin(
            'gene_annotations',
            'genes.id',
            'gene_annotations.gene_id',
        )
        .then((gene) => {
            // this will loop through the data and remove _at from ensembl_gid.
            const geneList = gene.map((row) => {
                row.name = row.name.split('_')[0];
                return row;
            });
            // sending the response.
            response.status(200).json({
                status: 'success',
                data: geneList,
            });
        })
        .catch((error) => response.status(500).json({
            status: 'could not find data from genes table, getGenes',
            data: error,
        }));
};

const getIndivGene = (request, response) => {
    const geneIds = request.params.id.split(',').map((item) => parseInt(item, 10));
    knex.select('id', 'name', 'symbol', 'ensembl_tid', 'entrez_gid', 'transcript_name')
        .from('genes')
        .leftJoin(
            'gene_annotations',
            'genes.id',
            'gene_annotations.gene_id',
        )
        .whereIn('genes.id', geneIds)
        .then((gene) => {
            const geneList = gene.map((row) => {
                row.name = row.name.split('_')[0];
                return row;
            });
            // sending the response.
            response.status(200).json({
                status: 'success',
                data: geneList,
            });
        })
        .catch((error) => response.status(500).json({
            status: 'could not find data from genes table, getGenes',
            data: error,
        }));
};

const getGeneAnalysis = (request, response) => {
    const geneIds = request.params.id.split(',').map((item) => parseInt(item, 10));
    knex.distinct('fdr', 'fold_change', 'p_value', 'drugs.id AS drug_id', 'drugs.name AS drug_name', 'datasets.name AS dataset_name')
        .from('analysis')
        .innerJoin('drug_gene_response AS dgr', 'analysis.id', 'dgr.analysis_id')
        .innerJoin('samples', 'samples.id', 'dgr.sample_id')
        .innerJoin('drugs', 'samples.drug_id', 'drugs.id')
        .innerJoin('datasets_samples AS ds', 'samples.id', 'ds.sample_id')
        .innerJoin('datasets', 'ds.dataset_id', 'datasets.id')
        .whereIn('gene_id', geneIds)
        .then((analysis) => response.status(200).json({
            status: 'success',
            data: analysis,
        }))
        .catch((error) => response.status(500).json({
            status: 'could not find data from analysis table, getGeneAnalysis',
            data: error,
        }));
};


module.exports = {
    getGenes, getIndivGene, getGeneAnalysis,
};
