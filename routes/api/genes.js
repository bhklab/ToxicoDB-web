/* eslint-disable func-names */
const knex = require('../../db/knex');


// get all the data from the genes table.

const getGenes = function (request, response) {
    knex.select('id', 'name', 'ensembl_gid', 'ensembl_tid', 'entrez_gid', 'transcript_name')
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

const getIndivGene = (request, response) => {
    knex.select('id','name', 'ensembl_gid', 'ensembl_tid', 'entrez_gid', 'transcript_name')
        .from('genes')
        .leftJoin(
            'gene_annotations',
            'genes.id',
            'gene_annotations.gene_id',
        )
        .where({ "genes.id": request.params.id })
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
    getGenes, getIndivGene
};
