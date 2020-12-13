const { karma } = require('../paths.js');

const { BROWSER_TO_TEST } = process.env;

module.exports = function(config) {
    const options = {
        frameworks: ['mocha'],
        files: [karma.testFile],
        client: { mocha: { reporter: 'html' } }
    };

    if (BROWSER_TO_TEST) {
        options.browsers = [BROWSER_TO_TEST];
    }

    config.set(options);
};
