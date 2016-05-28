'use strict';

const query = require('../lib/query');
const wrap = require('co-express');
const _ = require('lodash');

/**
 * Home
 */

module.exports.index = (req, res) => {
    return res.render('home', {
        app: 'main'
    });
};

/**
 * Continent + emoji selector
 */

module.exports.select = (req, res) => {
    return res.render('select', {
        app: 'select'
    });
};

/**
* About
*/

module.exports.about = (req, res) => {
    return res.render('about', {
        app: 'main'
    });
};

/**
 * Result
 */

module.exports.show = wrap(function*(req, res) {
    const continents = {
        EU: req.__('Europe'),
        AS: req.__('Asia'),
        AF: req.__('Africa'),
        NA: req.__('North America'),
        SA: req.__('South America'),
        OC: req.__('Oceania')
    };

    const emotions = {
        grin: '😀',
        joy: '😂',
        relaxed: '😊',
        unamused: '😒',
        sob: '😭'
    };

    const c1tweets = yield query({ continent: req.body.continent1, emoji: emotions[req.body.emotion] });
    const c2tweets = yield query({ continent: req.body.continent2, emoji: emotions[req.body.emotion] });

    return res.render('show', {
        app: 'show',
        emotion: emotions[req.body.emotion],
        c1: {
            name: continents[req.body.continent1],
            code: req.body.continent1,
            tweets: _.shuffle(c1tweets)
        },
        c2: {
            name: continents[req.body.continent2],
            code: req.body.continent2,
            tweets: _.shuffle(c2tweets)
        }
    });
});

module.exports.locale = (req, res) => {
    res.cookie('locale', req.params.locale, {
        maxAge: 900000
    });

    res.redirect('back');
};
