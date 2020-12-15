const { karma } = require('../paths.js');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [karma.testFile],
        client: { mocha: { reporter: 'html' } },
        customLaunchers: {
            bs_chrome_87_mac: {
                base: 'BrowserStack',
                browser: 'chrome',
                browser_version: '87.0',
                os: 'OS X',
                os_version: 'Catalina'
            }
        }
    });
};
