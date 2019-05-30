const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbEndpoint = process.env.DB_ENDPOINT || '127.0.0.1';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

Sequelize.Promise.config({
    longStackTraces: true
});

const sequelize = new Sequelize('poker', dbUser, dbPassword, {
        dialect: 'postgres',
        host: dbEndpoint,
    }),
    db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js';
    })
    .forEach(function(file) {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
