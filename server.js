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

app.get('/weblapmodositas', (req, res) => {
    fs.readFile(path.join(__dirname, 'src', 'public', 'webmester-weblapmodositas.html'), 'utf8', (err, data) => {
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

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.post('/adatKuldes', async (req, res) => {
    kommunikaciosAdat = req.body.data;

    if (kommunikaciosAdat.kategoria == "weblap") {
        
        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {           
            try {
                const result = await weblaplekerdezesAsync();
                res.json(result);
            } catch (err) {
                console.error(err);
                res.json(err);
            }
        }
        if  (kommunikaciosAdat.tipus == "modositas")
        {      
            try {
                const kepresult = await kepfeldolgozasAsync(kommunikaciosAdat.kepbuffer);
                if (kepresult.siker == true)
                {
                    try {
                        kommunikaciosAdat.kepbuffer = kepresult.uzenet;
                        const result = await weblapadatmodositasAsync(kommunikaciosAdat);
                        res.json({ siker: result.siker, uzenet: result.uzenet});
                    } catch (err) {
                        console.error(err);
                        res.json({ siker: false, uzenet: err});
                    }
                }
                else
                {
                    res.json({ siker: false, uzenet: kepresult.uzenet});
                }
            } catch (err) {
                console.error(err);
                res.json({ siker: false, uzenet: err});
            }   
        }

    }

    if (kommunikaciosAdat.kategoria == "felhasznalo") {

        if  (kommunikaciosAdat.tipus == "lekerdezes")
        {
            try {
                const result = await felhasznalolekerdezesAsync()
                res.json(result);
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
        return { siker: false, uzenet: err };
    }
};

const weblapadatmodositas = require('./backend/backend-weblap-adatmodositas');
const weblapadatmodositasAsync = async (kommunikaciosAdat) => {    
    try {
        const result = await new Promise((resolve, reject) => {
            weblapadatmodositas(
                kommunikaciosAdat.nev,
                kommunikaciosAdat.leiras,
                kommunikaciosAdat.kepbuffer,
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

const kepfeldolgozas = require('./backend/backend-kep-feldolgozas');
const kepfeldolgozasAsync = async (kepbuffer) => {
try {
    const result = await new Promise((resolve, reject) => {
        kepfeldolgozas(
            kepbuffer,
            200,
            200,
            
            (err, result) => {
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