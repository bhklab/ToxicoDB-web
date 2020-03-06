/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();

// setting the path to const so that we can use it later.
const datasets = require('./api/datasets');
const drugs = require('./api/drugs');
const genes = require('./api/genes');
const pathways = require('./api/pathways');
// const samples = require('./api/samples');
const tissues = require('./api/tissues');
const cells = require('./api/cells');
const experiments = require('./api/experiments');
const species = require('./api/species');

router.get('/v1/datasets', datasets.getDatasets);
router.get('/v1/datasets/:id', datasets.getIndivDataset);

router.get('/v1/drugs', drugs.getDrugs);
router.get('/v1/drugs/:id', drugs.getIndivDrug);
router.get('/v1/drugs/:id/analysis', drugs.getDrugAnalysis);
router.post('/v1/drugs/dataset', drugs.getDrugsPerDataset);

router.get('/v1/genes', genes.getGenes);
router.get('/v1/genes/:id', genes.getIndivGene);
router.get('/v1/genes/:id/analysis', genes.getGeneAnalysis);

router.post('/v1/pathways/dataset/drug', pathways.getPathwaysPerDatasetDrug);
router.post('/v1/pathwaystats/dataset', pathways.getPathwayStatsPerDataset);
// router.get('/v1/pathways', pathways.getPathways);
// router.get('/v1/samples', samples.getSamples);

router.get('/v1/experiments', experiments.getExperiments);

router.get('/v1/tissues', tissues.getTissues);

router.get('/v1/cells', cells.getCells);

router.get('/v1/species', species.getSpecies);


module.exports = router;
