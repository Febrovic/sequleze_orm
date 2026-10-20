const Sequalize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

module.exports = new Sequalize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});