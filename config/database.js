const Sequalize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Vercel needs the driver passed explicitly: mysql2 for MySQL, pg for PostgreSQL
const dialectModule = config.dialect === 'postgres' ? require('pg') : require('mysql2');

module.exports = new Sequalize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectModule,
    logging: config.logging,
    dialectOptions: process.env.DB_SSL === 'true'
        ? { ssl: { require: true, rejectUnauthorized: true, ca: process.env.DB_CA_CERT?.replace(/\\n/g, '\n') } }
        : {},
});
