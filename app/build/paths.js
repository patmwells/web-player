const path = require('path');

const roots = {
    src: path.resolve('src'),
    test: path.resolve('test'),
    build: path.resolve('build'),
    dist: path.resolve('dist')
};

module.exports = {
    webpack: {
        client: {
            entry: path.resolve(roots.src, 'client', 'index.jsx'),
            output: {
                path: path.resolve(roots.dist, 'client'),
                filename: 'index.bundle.js'
            }
        },
        server: {
            entry: path.resolve(roots.src, 'server', 'index.js'),
            output: {
                path: path.resolve(roots.dist, 'server'),
                filename: 'index.js'
            }
        },
        test: {
            entry: path.resolve(roots.test, 'browser', 'index.js'),
            output: {
                path: path.resolve(roots.dist, 'test'),
                filename: 'browser.test.bundle.js'
            }
        }
    },
    karma: {
        testFile: path.resolve(roots.dist, 'test', 'browser.test.bundle.js')
    }
};
