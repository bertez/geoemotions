'use strict';

const path = require('path');

const config = require('./');

/**
 * Controllers
 */

const twoplaces = require(path.join(config.root, 'app/controllers/twoplaces'));

module.exports = (app) => {

    /**
     * Public
     */
    app.get('/', twoplaces.index);
    app.get('/select', twoplaces.select);
    app.post('/show', twoplaces.show);
    app.get('/about', twoplaces.about);


    //Locales
    app.get('/locale/:locale', twoplaces.locale);


    /**
     * Error Handling
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            return res.render('error', {
                layout: 'simple',
                message: err.message,
                error: err.stack
            });
        });
    }

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        return res.render('error', {
            layout: 'simple',
            message: err.message
        });
    });
};
