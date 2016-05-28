const webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        main: './app/public/js/main.js',
        select: './app/public/js/select.js',
        show: './app/public/js/show.js'
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
        publicPath: '/js/',
        chunkFilename: '[id].[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'web_modules', 'modules'],
        alias: {
            justifiedGallery: 'justifiedGallery/dist/js/jquery.justifiedGallery.js'
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/, /web_modules/],
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'common.js',
            name: 'common'
        }),
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ]),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    node: {
        fs: 'empty'
    }
};
