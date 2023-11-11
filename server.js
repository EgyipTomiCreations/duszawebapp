const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.post('/adatKuldes', async (req, res) => {
    const kommunikaciosAdat = req.body.data;
    console.log(req.body.data);
    console.log('Kapott adat a frontendtől:', kommunikaciosAdat);

    if (kommunikaciosAdat.kategoria == "weblap") {
        
        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {
            const weblaplekerdezes = require('./backend/backend-weblap-adatlekerdezes');
            weblaplekerdezes((err, result) => {
                if (err) {
                    console.error(err);
                    res.json({ siker: false, uzenet: err });
                } else {
                    res.json({ siker: true, uzenet: result });
                }
                });
        }
        if  (kommunikaciosAdat.tipus == "adatmodositas")
        {
            const weblapadatmodositas = require('./backend/backend-weblap-adatmodositas');
            weblapadatmodositas((err, result) => {
                if (err) {
                    console.error(err);
                    res.json({ siker: false, uzenet: err });
                } else {
                    res.json({ siker: true, uzenet: result });
                }
                })
        }

    }

    if (kommunikaciosAdat.kategoria == "felhasznalo") {

        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {
            const felhasznalolekerdezes = require('./backend/backend-felhasznalo-lekerdezes');
            await felhasznalolekerdezes(async (err, result) => {
                if (err) {
                    console.error(err);
                    res.json({ siker: false, uzenet: err });
                } else {
                    res.json({ siker: true, uzenet: result });
                }
                });
        }
        if  (kommunikaciosAdat.tipus == "bejelentkezes")
        {
            const felhasznalobejelentkezes = require('./backend/backend-felhasznalo-bejelentkezes');
            felhasznalobejelentkezes(kommunikaciosAdat.nev, kommunikaciosAdat.jelszo, (err, result) => {
                if (err) {
                    console.error(err);
                    res.json({ siker: false, uzenet: err });
                } else {
                    res.json({ siker: true, uzenet: result });
                }
                });
        }
        if  (kommunikaciosAdat.tipus == "regisztracio")
        {
            const felhasznaloregisztracio = require('./backend/backend-felhasznalo-regisztracio');
            felhasznaloregisztracio(kommunikaciosAdat.nev, kommunikaciosAdat.jelszo, kommunikaciosAdat.szerpkor, kommunikaciosAdat.evfolyam,  (err, result) => {
                if (err) {
                    console.error(err);
                    res.json({ siker: false, uzenet: err });
                } else {
                    res.json({ siker: true, uzenet: result });
                }
            });
            
        }
        if  (kommunikaciosAdat.tipus == "modositas")
        {
            const felhasznalomodositas = require('./backend/backend-felhasznalo-modositas');
            felhasznalomodositas(kommunikaciosAdat.bejelentkezesinev, kommunikaciosAdat.bejelentkezesijelszo, (err, result) => {
            if (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            } else {
                res.json({ siker: true, uzenet: result });
            }
            });
        }
        if  (kommunikaciosAdat.tipus == "torles")
        {
            const felhasznalotorles = require('./backend/backend-felhasznalo-torles');
            felhasznalotorles(kommunikaciosAdat.nev, (err, result) => {
            if (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            } else {
                res.json({ siker: true, uzenet: result });
            }
            });
        }
        
    }

    res.json({ siker: false, uzenet: 'Belső kommunikációs hiba a frontend - backend között!' });
});