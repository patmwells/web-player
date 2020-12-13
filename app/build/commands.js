const paths = require('./paths.js');

function command(command, options = []) {
    return { command, options };
}

function build(type) {
    return command(`webpack --config ${paths.webpack.config} --env type=${type}`);
}

function watch(type) {
    const options = [
        '--config', paths.webpack.config,
        '--env', `type=${type}`,
        '--watch'
    ];

    return command('webpack', options);
}

function eslint() {
    return command(`eslint --ext .js,jsx ${paths.src} ${paths.test} ${paths.build}`);
}

function jest(options = '') {
    return command(`jest ${paths.src} ${options}`);
}

function nodemon() {
    const { output } = paths.webpack.server;
    return command(`nodemon --watch ${output.path} ${output.path}/${output.filename}`);
}

function karma(options = '') {
    return command(`karma start ${paths.karma.config} ${options}`);
}

module.exports = {
    webpack: {
        build,
        watch
    },
    eslint,
    jest,
    nodemon,
    karma
};
