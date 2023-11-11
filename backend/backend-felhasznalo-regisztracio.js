var config = require('./backend-config');
var mysql = require('mysql');

function felhasznaloregisztracio(regisztraciosnev, regisztraciosjelszo, regisztraciosszerepkor, regisztraciosevfolyam, regisztraciososztalyjel, callback) {

  console.log(regisztraciosszerepkor);
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

    con.query(`SELECT nev FROM felhasznalok WHERE nev = "${regisztraciosnev}";`, function (err, result) {
        if (err) {
            con.end();
            return callback("Hiba a felhasználók lekérdezése közben!" + err);
        }

        if (result && result[0] && result[0].nev == regisztraciosnev) {
            con.end();
            return callback("Hiba! Már létezik ilyen felhasználó!");
        } else {
          
            con.query(`INSERT INTO felhasznalok (nev, jelszo, szerepkor, evfolyam, osztalyjel) VALUES ("${regisztraciosnev}", "${regisztraciosjelszo}", "${regisztraciosszerepkor}", "${regisztraciosevfolyam}", "${regisztraciososztalyjel}")`, function (err, result) {
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