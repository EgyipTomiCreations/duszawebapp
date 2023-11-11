var config = require('./backend-config');
var mysql = require('mysql');

function csoportregisztracio(nev, tag1id, tag2id, tag3id, callback) {

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
          
            con.query(`INSERT INTO csoportok (nev, tag1id, , evfolyam, osztalyjel) VALUES ("${regisztraciosnev}", "${regisztraciosjelszo}", "${regisztraciosszerepkor}", "${regisztraciosevfolyam}", "${regisztraciososztalyjel}")`, function (err, result) {
                if (err) {
                    con.end();
                    return callback(`${regisztraciosnev}-t nem sikerült regisztrálni! Hiba: ` + err);
                }
                con.end();
                return callback(null, "Sikeres regisztráció!");
            });
        }
    });
}

module.exports = felhasznaloregisztracio;