const csoportregisztracio = require('./backend-csoport-regisztracio');
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

var kommunikaciosAdat = {};
kommunikaciosAdat.nev = "tesztcsoportnev";
kommunikaciosAdat.tag1id = 2;
kommunikaciosAdat.tag2id = 8;
kommunikaciosAdat.tag3id = 10;
kommunikaciosAdat.leiras = "tesztleiras";
asd(kommunikaciosAdat);

async function asd (){
try {
    const result = await csoportregisztracioAsync(kommunikaciosAdat);
    res.json(result);
} catch (err) {
    console.error(err);
    res.json({ siker: false, uzenet: err });
}
}