// environement variable.
// set the environment variable in .env file.
let environment = process.env.NODE_ENV || 'development';
// config variable based on the environment.
let config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);