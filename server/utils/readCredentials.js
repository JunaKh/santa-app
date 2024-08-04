const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readCredentials(callback) {
    const results = [];

    fs.createReadStream(path.join(__dirname, '../credentials.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length > 0) {
                const { email, password } = results[0];
                callback(null, { email, password });
            } else {
                callback(new Error('No credentials found'));
            }
        })
        .on('error', (error) => {
            callback(error);
        });
}

module.exports = { readCredentials };
