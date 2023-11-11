const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

var kommunikaciosAdat;

app.use("/", express.static(__dirname, + '/'));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'bejelentkezes.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba a HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.get('/webmester', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'webmester.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba a HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.get('/tanar', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'tanar.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba a HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.get('/zsuri', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'zsuri.html'), 'utf8', (err, data) => {
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

/*app.get('/verseny', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'verseny.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba a HTML fájl olvasása közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});*/

app.listen(port, () => {
    console.log(`A webszerver fut a http://localhost:${port} címen`);
});

app.use(bodyParser.json());
app.post('/adatKuldes', async (req, res) => {
    kommunikaciosAdat = req.body.data;
    console.log('Kapott adat a frontendtől:', kommunikaciosAdat);

    if (kommunikaciosAdat.kategoria == "weblap") {
        
        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {           
            try {
                const result = await weblaplekerdezesAsync();
                res.json({ siker: true, uzenet: result });
            } catch (err) {
                console.error(err);
                res.json(err);
            }
        }
        if  (kommunikaciosAdat.tipus == "adatmodositas")
        {           
            try {
                const result = await weblapadatmodositasAsync();
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }

    }

    if (kommunikaciosAdat.kategoria == "felhasznalo") {

        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {
            try {
                const result = await felhasznalolekerdezesAsync()
                res.json({ siker: true, uzenet: result });
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
        if  (kommunikaciosAdat.tipus == "bejelentkezes")
        {           
            try {
                const result = await felhasznalobejelentkezesAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
        if  (kommunikaciosAdat.tipus == "regisztracio")
        {
            try {
                const result = await felhasznaloregisztracioAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
        if  (kommunikaciosAdat.tipus == "modositas")
        {            
            try {
                const result = await felhasznalomodositasAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
        if  (kommunikaciosAdat.tipus == "torles")
        {
            try {
                const result = await felhasznalotorlesAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
        
    }
    if (kommunikaciosAdat.kategoria == "csoport")
    {
        if (kommunikaciosAdat.tipus == "regisztracio")
        {
            try {
                const result = await csoportregisztracioAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }

        if (kommunikaciosAdat.tipus == "modositas")
        {
            try {
                const result = await csoportmodositasAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }

        if (kommunikaciosAdat.tipus == "torles")
        {
            try {
                const result = await csoporttorlesAsync(kommunikaciosAdat);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }

        if (kommunikaciosAdat.tipus == "lekerdezes")
        {
            try {
                const result = await csoportlekerdezesAsync();
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err });
            }
        }
    }

    //res.json({ siker: false, uzenet: 'Belső kommunikációs hiba a frontend - backend között!' });
});



//async muveletek felvetele
const weblaplekerdezes = require('./backend/backend-weblap-adatlekerdezes');
const weblaplekerdezesAsync = async (kommunikaciosAdat) => {
    try {
        return new Promise((resolve, reject) => {
            weblaplekerdezes((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw { siker: false, uzenet: err };
    }
};

const weblapadatmodositas = require('./backend/backend-weblap-adatmodositas');
const weblapadatmodositasAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            weblapadatmodositas((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
};




const felhasznalolekerdezes = require('./backend/backend-felhasznalo-lekerdezes');
const felhasznalolekerdezesAsync = () => {
    return new Promise((resolve, reject) => {
        felhasznalolekerdezes((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


const felhasznaloregisztracio = require('./backend/backend-felhasznalo-regisztracio');
const felhasznaloregisztracioAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            console.log(kommunikaciosAdat);
            felhasznaloregisztracio(
                kommunikaciosAdat.nev,
                kommunikaciosAdat.jelszo,
                kommunikaciosAdat.szerepkor,
                kommunikaciosAdat.evfolyam,
                kommunikaciosAdat.osztalyjel,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
};


const felhasznalomodositas = require('./backend/backend-felhasznalo-modositas');
const felhasznalomodositasAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            felhasznalomodositas(
                kommunikaciosAdat.id,
                kommunikaciosAdat.nev,
                kommunikaciosAdat.jelszo,
                kommunikaciosAdat.szerepkor,
                kommunikaciosAdat.evfolyam,
                kommunikaciosAdat.osztalyjel,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
};


const felhasznalotorles = require('./backend/backend-felhasznalo-torles');
const felhasznalotorlesAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            felhasznalotorles(kommunikaciosAdat.nev, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
};


const felhasznalobejelentkezes = require('./backend/backend-felhasznalo-bejelentkezes');
const felhasznalobejelentkezesAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            felhasznalobejelentkezes(
                kommunikaciosAdat.nev,
                kommunikaciosAdat.jelszo,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
};





const csoportregisztracio = require('./backend/backend-csoport-regisztracio');
const csoportregisztracioAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            csoportregisztracio(
                kommunikaciosAdat.nev,
                kommunikaciosAdat.tag1id,
                kommunikaciosAdat.tag2id,
                kommunikaciosAdat.tag3id,
                kommunikaciosAdat.leiras,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
}

const csoportmodositas = require('./backend/backend-csoport-modositas');
const csoportmodositasAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            csoportmodositas(
                kommunikaciosAdat.nev,
                kommunikaciosAdat.tag1id,
                kommunikaciosAdat.tag2id,
                kommunikaciosAdat.tag3id,
                kommunikaciosAdat.leiras,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
}


const csoporttorles = require('./backend/backend-csoport-torles');
const csoporttorlesAsync = async (kommunikaciosAdat) => {
    try {
        const result = await new Promise((resolve, reject) => {
            csoporttorles(
                kommunikaciosAdat.nev,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
}


const csoportlekerdezes = require('./backend/backend-csoport-torles');
const csoportlekerdezesAsync = async () => {
    try {
        const result = await new Promise((resolve, reject) => {
            csoportlekerdezes((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return { siker: true, uzenet: result };
    } catch (err) {
        console.error(err);
        return { siker: false, uzenet: err };
    }
}