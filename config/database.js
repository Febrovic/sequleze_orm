const Sequalize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

module.exports = new Sequalize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectModule: require('mysql2'),
    logging: config.logging,
    dialectOptions: process.env.DB_SSL === 'true'
        ? { ssl: { rejectUnauthorized: true, ca: process.env.DB_CA_CERT } }
        : {},
});
