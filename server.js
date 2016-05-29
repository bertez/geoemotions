'use strict';

/**
 * ENV variables:
 *
 *  - HOST
 *  - PORT
 *
 *  - NODE_ENV
 *  - SECRET
 *  - LOCALES
 *  - DEFAULT_LOCALE
 *  - NAME
 *  - EMAIL
 *  - URL
 *  - DESCRIPTION
 *  - IMAGE
 *  - CONSUMER_KEY
 *  - CONSUMER_SECRET
 *  - TOKEN
 *  - TOKEN_SECRET
 */

const express = require('express');
const i18n = require('i18n');

const config = require('./config');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;


/**
 * Server module
 */

module.exports.startServer = function () {
    const app = express();

    /**
     * Init i18n
     */

    i18n.configure(config.i18n);

    /**
     * Bottstrap App
     */

    require('./config/express')(app);
    require('./config/routes')(app);


    /**
     * Server
     */
    const serve = () => {
        const server = app.listen(port, host);
        require('./app/lib/streamer').stream(server);

        console.warn(`App listening on ${host}:${port}`);
    };

    serve();
};


if (require.main === module) {
    module.exports.startServer();
}