// environement variable.
// set the environment variable in .env file.
const environment = process.env.NODE_ENV || 'development';
// config variable based on the environment.
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
