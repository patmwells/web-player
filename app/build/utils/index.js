const { execSync, spawn } = require('child_process');

function syncExec({ command }) {
    execSync(command, { stdio: 'inherit' });
}

function asyncSpawn({ command, options }) {
    spawn(command, options, { stdio: 'inherit' });
}

module.exports = { execSync: syncExec, spawn: asyncSpawn };
