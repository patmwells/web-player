const merge = require('webpack-merge').merge;
const common = require('./common.config.js');
const test = require('./test.config.js');
const client = require('./client.config.js');
const server = require('./server.config.js');

function config(env = { type: 'prod' }) {
    const args = JSON.stringify(env);

    console.log('[webpack] building with', args);

    switch(env.type) {
        case 'dev':
            return [
                merge(common, client.prod, client.dev),
                merge(common, server.prod, server.dev),
                merge(common, test.prod, test.dev)
            ];
        case 'prod':
            return [
                merge(common, client.prod),
                merge(common, server.prod),
                merge(common, test.prod)
            ];
        default:
            throw new Error('unknown webpack build args ' + args);
    }
}

module.exports = config;
