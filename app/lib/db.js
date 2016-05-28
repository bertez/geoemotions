const Datastore = require('nedb');
const config = require('../../config');

const db = new Datastore({
    filename: config.persistence,
    autoload: true
});

module.exports = db;
