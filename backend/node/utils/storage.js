const fs = require('fs/promises');
const path = require('path');

const dataFolder = path.join(__dirname, '..', '..', '..', 'database');

async function readJsonFile(fileName) {
    const filePath = path.join(dataFolder, fileName);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
        throw error;
    }
}

async function writeJsonFile(fileName, data) {
    const filePath = path.join(dataFolder, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readJsonFile, writeJsonFile };