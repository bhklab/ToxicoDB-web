/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const csv = require('csvjson');
const fs = require('fs');
const path = require('path');

const fileLocation = path.join(__dirname, '../../data_table/genes_datasets.csv');

const file = fs.readFileSync(fileLocation, 'utf8');
const dataObj = csv.toObject(file);


exports.seed = function (knex, Promise) {
    return knex('genes_datasets').del()
        .then(function() {
            return knex('genes_datasets').insert(dataObj);
        });
};