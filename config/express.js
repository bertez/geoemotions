'use strict';

const path = require('path');

const config = require('./');
const pkg = require('../package.json');

const express = require('express');
const exphbs = require('express-handlebars');
const compression = require('compression');
const logger = require('morgan');
const i18n = require('i18n');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');

const viewHelpers = require(path.join(config.root, 'app/lib/view-helpers'));

const env = config.env;

module.exports = function (app) {


    /**
     * Compression
     */

    app.use(compression());

    /**
     * views
     */

    app.set('views', path.join(config.root, 'app/views'));

    app.engine('.hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        helpers: viewHelpers
    }));

    app.set('view engine', '.hbs');


    /**
     * Logger
     */

    if (env === 'development') {
        app.use(logger('dev'));
    }

    /**
     * Body parser
     */

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));


    /**
     * Static
     */

    if (env === 'development') {
        app.use('/static', express.static(path.join(config.root, 'dist')));
        app.use('/uploads', express.static(path.join(config.root, 'uploads')));
    }

    /**
     * Cookie
     */

    app.use(cookieParser());
    app.use(cookieSession({
        secret: config.secret
    }));


    /**
     * Session
     */

    app.use(session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true
    }));


    /**
     * Init i18n
     */

    app.use(i18n.init);

    /**
     * Some default locals
     */

    app.use(function (req, res, next) {
        res.locals.site = config.info;
        res.locals.pkg = pkg;

        return next();
    });


};