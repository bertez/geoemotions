'use strict';

const db = require('./db');

module.exports = (query) => {
    return new Promise((resolve, reject) => {
        db.find(query).limit(50).exec((err, docs) => {
            if (err) {
                return reject(err);
            }

            return resolve(docs);
        });
    });
};