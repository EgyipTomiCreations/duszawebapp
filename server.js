const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use("/", express.static(__dirname, + '/'));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'webmester.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba a HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`A webszerver fut a http://localhost:${port} címen`);
});