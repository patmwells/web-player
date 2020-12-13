const { karma } = require('../paths.js');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [karma.testFile],
        client: { mocha: { reporter: 'html' } }
    });
};
