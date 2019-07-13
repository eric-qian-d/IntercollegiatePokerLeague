const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASS || '';
const dbEndpoint = process.env.DB_HOST || '127.0.0.1';
const dbName = process.env.DB_NAME || 'poker';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');


Sequelize.Promise.config({
    longStackTraces: true
});

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        dialect: 'postgres',
        host: dbEndpoint,
        logging: false,
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

// seedSchools.createAllSchools();
//userLogic.associateAllUsersWithSchools();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// sequelize.sync();


module.exports = db;
