/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const csv = require('csvjson');
const fs = require('fs');
const path = require('path');

const fileLocation = path.join(__dirname, '../../data_table/tissues.csv');

const file = fs.readFileSync(fileLocation, 'utf8');

const options = {
    delimiter: ',', // optional
    quote: '"', // optional
};

const dataObj = csv.toObject(file, options);


exports.seed = function (knex, Promise) {
    return knex('tissues').del()
        .then(function() {
            return knex('tissues').insert(dataObj);
        });
};
