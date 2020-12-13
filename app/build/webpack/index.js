const merge = require('webpack-merge').merge;
const common = require('./common.config.js');
const test = require('./test.config.js');
const client = require('./client.config.js');
const server = require('./server.config.js');

function config(env = { dev: false }) {
    const args = JSON.stringify(env);

    console.log('[webpack] building with', args);

    return env.dev
        ? [
            merge(common, client.prod, client.dev),
            merge(common, server.prod, server.dev),
            merge(common, test.prod, test.dev)
        ]
        : [
            merge(common, client.prod),
            merge(common, server.prod),
            merge(common, test.prod)
        ];
}

module.exports = config;
