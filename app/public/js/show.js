'use strict';

const $ = require('jquery');
require('justifiedGallery');

const $panels = $('[data-continent]');

//Justify
$panels.find('[data-images]').justifiedGallery({
    rowHeight: 300,
    lastRow: 'nojustify',
    margins: 3
});

//Update tweets from websocket
const io = require('socket.io-client');

const socket = io('ws://localhost:8080');

socket.on('connect', () => {
    for (let panel of $panels) {
        const $panel = $(panel);
        const $images = $panel.find('[data-images]');
        socket.on($panel.data('continent'), data => {
            setTimeout(() => {
                $images.prepend(`
                    <a href="${data.image}">
                        <img src="${data.image}" alt="${data.text}">
                    </a>
                `);

                $images.justifiedGallery();
            }, 1000);
        });

    }
});
