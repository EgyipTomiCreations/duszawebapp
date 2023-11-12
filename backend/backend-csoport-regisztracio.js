var config = require('./backend-config');
var mysql = require('mysql');

function csoportregisztracio(nev, tag1id, tag2id, tag3id, leiras, callback) {

    var con = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password
    });

    con.connect(function (err) {
        if (err) {
            con.end();
            return callback("Sikeretelen kapcsolat az adatbázissal! Hiba: " + err);
        }
    });

    con.query(`USE ${config.adatbazisnev}`, function (err) {
        if (err) {
            con.end();
            return callback("Nem sikerült az adatbázis használatba venni! Hiba: " + err);
        }
    });

    con.query(`SELECT nev FROM csoportok WHERE nev = "${nev}";`, function (err, result) {
        if (err) {
            con.end();
            return callback("Hiba a csoportok lekérdezése közben!" + err);
        }

        if (result && result[0] && result[0].nev == nev) {
            con.end();
            return callback("Hiba! Már létezik ilyen nevű csoport!");
        } else {
            con.query(` SELECT nev
                        FROM felhasznalok
                        WHERE id = (
                        SELECT COALESCE(
                            (SELECT tag1id FROM csoportok WHERE tag1id IN (${tag1id}, ${tag2id}, ${tag3id})),
                            (SELECT tag2id FROM csoportok WHERE tag2id IN (${tag1id}, ${tag2id}, ${tag3id})),
                            (SELECT tag3id FROM csoportok WHERE tag3id IN (${tag1id}, ${tag2id}, ${tag3id}))));`, function (err, result) {
                            console.log(result)
                            if (err) {
                                con.end();
                                return callback(`Nem sikerült ${nev} csoport helyességét ellenőrizni! Hiba: ` + err);
                            }
                            if  (result[0].nev == null)
                            {
                                con.query(`INSERT INTO csoportok (nev, tag1id, , tag2id, tag3id, leiras ) VALUES ("${nev}", "${tag1id}", "${tag2id}", "${tag3id}", "${leiras}")`, function (err, result) {
                                    if (err) {
                                        con.end();
                                        return callback(`${nev} csoportot nem sikerült regisztrálni! Hiba: ` + err);
                                    }
                                    con.end();
                                    return callback(null, "Sikeres regisztráció!");
                                });
                            }
                            else
                            {   
                                return callback(`Hiba! ${result[0].nev} felhasználó már megtalálható más csoportban!`);
                            }
                        });
        }
    });
}

module.exports = csoportregisztracio;