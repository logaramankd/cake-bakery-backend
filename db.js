require('dotenv').config();
const knex = require('knex');
const config = require('./knexfile.js');
const { Model } = require('objection');
const db = knex(config.development);
console.log('Knex config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
Model.knex(db);
module.exports = db;