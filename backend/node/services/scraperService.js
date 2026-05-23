const { exec } = require('child_process');
const path = require('path');

const pythonAppPath = path.join(__dirname, '..', '..', 'python', 'app.py');

exports.search = (query) => {
    return new Promise((resolve, reject) => {
        exec(`python "${pythonAppPath}" "${query}"`, { cwd: path.join(__dirname, '..', '..', 'python') }, (err, stdout, stderr) => {
            if (err) {
                console.error('Exec error:', err);
                return reject(err);
            }
            if (stderr) {
                console.error('Stderr:', stderr);
            }

            try {
                const data = JSON.parse(stdout);
                resolve(data);
            } catch (e) {
                console.error('JSON parse error:', e);
                resolve([]);
            }
        });
    });
};