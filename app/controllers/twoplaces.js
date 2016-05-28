'use strict';


const wrap = require('co-express');

/**
 * Home
 */

module.exports.index = (req, res) => {
    return res.render('home', {
        app: 'main'
    });
};

module.exports.locale = (req, res) => {
    res.cookie('locale', req.params.locale, {
        maxAge: 900000
    });

    res.redirect('back');
};
