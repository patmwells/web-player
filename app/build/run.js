const { execSync, spawn } = require('./utils');
const { eslint, jest, karma, nodemon, webpack } = require('./commands.js');

function main(arg) {
    console.log('[build] executing', arg);

    switch(arg) {
        case 'lint':
            execSync(eslint());
            break;
        case 'test:unit':
            execSync(jest());
            break;
        case 'test:unit:watch':
            execSync(jest('--watch'));
            break;
        case 'test:browser':
            execSync(karma('--single-run'));
            break;
        case 'test:browser:watch':
            execSync(karma());
            break;
        case 'start:dev':
            execSync(webpack.build('dev'));
            spawn(webpack.watch('dev'));
            execSync(nodemon());
            break;
        case 'build:prod':
            execSync(webpack.build('prod'));
            break;
        default:
            throw new Error('unknown build arg ' + arg);
    }
}

main(process.argv[2]);
