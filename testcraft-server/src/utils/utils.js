import { spawn } from 'child_process';
import fs from 'fs';
const path = require("path");

function runPy(scriptName) {
    return new Promise((resolve, reject) => {
        const pyprog = spawn('python', [path.join(__dirname, `../scripts/${scriptName}`)]);



        pyprog.on('exit', (data) => {
            const isExecutable = !data;
            if (isExecutable) {
                pyprog.stdout.on('data', (output) => {
                    resolve({ name: scriptName, output: output.toString(), isExecutable: isExecutable });
                });
            }
            else {
                pyprog.stderr.on('data', (output) => {
                    resolve({ name: scriptName, output: output.toString(), isExecutable: false });
                });
            }
        });
        return pyprog;
    });
}
function postPy(scriptName, script) {
    const scriptsPath = path.join(__dirname, `../scripts/${scriptName}.py`);
    return new Promise((resolve, reject) => {
        fs.writeFile(scriptsPath, script, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = {
    runPy: runPy,
    postPy: postPy
}