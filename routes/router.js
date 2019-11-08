/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();

// setting the path to const so that we can use it later.
const datasets = require('./api/datasets');
const drugs = require('./api/drugs');
const genes = require('./api/genes');
const pathways = require('./api/pathways');
const samples = require('./api/samples');
const tissues = require('./api/tissues');
const experiments = require('./api/experiments');

// APIs related to datasets table.
router.get('/v1/datasets', datasets.getDatasets);

// APIs related to drugtable.
router.get('/v1/drug', drugs.getDrugs);


// APIs related to genes table.
router.get('/v1/genes', genes.getGenes);


// APIs related to pathways table.
router.get('/v1/pathways', pathways.getPathways);


// APIs related to samples table.
router.get('/v1/samples', samples.getSamples);


// APIs related to tissues table.
router.get('/v1/tissues', tissues.getTissues);

// APIs related to experiments
router.get('/v1/experiments', experiments.getExperiments);


module.exports = router;
