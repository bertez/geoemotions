'use strict';

module.exports = {
    i18n: {
        locales: process.env.LOCALES && process.env.LOCALES.split(' '),
        defaultLocale: process.env.DEFAULT_LOCALE
    },
    email: process.env.EMAIL,
    info: {
        name: process.env.NAME,
        url: process.env.URL,
        description: process.env.DESCRIPTION,
        image: process.env.IMAGE

    },
    url: process.env.URL,
    env: 'development',
    secret: process.env.SECRET
};