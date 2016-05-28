'use strict';

require('babel-polyfill');

if(DEVELOPMENT) {
    const $ = require('jquery');
    window.$ = $;
}

if(PRODUCTION) {
    //Production
}

$('img').on('error', (e) => $(e.target).remove());
