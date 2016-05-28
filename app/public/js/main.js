'use strict';

require('shared');

const $ = require('jquery');

const $video = $('video');

if($video.length) {
    $video.get(0).play();

    $video.on('ended', () => {
        setTimeout(() => {
            location = '/select';
        }, 2000);
    });
}

