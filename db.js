require('dotenv').config();
const knex = require('knex');
const config = require('./knexfile.js');
const db = knex(config.development);
const { Model } = require('objection');
console.log('Knex config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
Model.knex(db);
module.exports = db;