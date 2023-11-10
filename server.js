const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Statikus fájlok kiszolgálása a public könyvtárból
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get('/', (req, res) => {
    // Olvasd be az HTML fájlt
    fs.readFile(path.join(__dirname, 'src', 'public', 'index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba az HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Küldd vissza az HTML tartalmát a kliensnek
        res.send(data);
    });
});

// Indítsd el a webszervert a megadott porton
app.listen(port, () => {
    console.log(`A webszerver fut a http://localhost:${port} címen`);
});