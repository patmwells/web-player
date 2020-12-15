const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { webpack: { client } } = require('../paths.js');

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins:[
        new LiveReloadPlugin({
            port: process.env.CLIENT_LR_PORT,
            hostname: 'localhost',
            appendScriptTag: true
        })
    ]
};

const prod = {
    mode: 'production',
    target: 'web',
    devtool: 'source-map',
    name: 'client',
    entry: client.entry,
    output: {
        publicPath: '/',
        path: client.output.path,
        filename: client.output.filename
    },
    plugins: [
        new HtmlWebpackPlugin({
            cache: false,
            filename: 'index.html',
            templateContent: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>React With Webpack</title>
                    </head>
                    <body>
                        <div id="root"></div>
                    </body>
                </html>
            `
        })
    ]
};

module.exports = {
    dev,
    prod
};
