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


// APIs related to datasets table.
router.get('/v1/datasets', datasets.getDatasets);

// APIs related to dataset table.
router.get('/v1/drugs', drugs.getdrugs);


// APIs related to dataset table.
router.get('/v1/genes', genes.getgenes);


// APIs related to dataset table.
router.get('/v1/pathways', pathways.getpathways);


// APIs related to dataset table.
router.get('/v1/samples', samples.getsamples);


// APIs related to dataset table.
router.get('/v1/tissues', tissues.gettissues);


module.exports = router;
