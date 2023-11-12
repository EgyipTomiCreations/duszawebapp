var config = require('./backend-config');
var mysql = require('mysql');

function versenyregisztracio(regisztraciosnev, regisztraciosleiras, regisztraciosevfolyam, regisztracioskezdoidopont, regisztracioszaroidopont, regisztracioscsoportidk, callback) {
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

    con.query(`SELECT nev FROM versenyek WHERE nev = "${regisztraciosnev}"; AND leiras = "${regisztraciosleiras}" AND evfolyam = "${regisztraciosevfolyam}" AND kezdoidopont = "${regisztracioskezdoidopont}" AND zaroidopont = "${regisztracioszaroidopont}" AND csapatidk = "${regisztracioscsoportidk}`, function (err, result) {
        if (err) {
            con.end();
            return callback("Hiba a versenyek lekérdezése közben!" + err);
        }

        if (result && result[0] && result[0].nev == regisztraciosnev) {
            con.end();
            return callback("Hiba! Már létezik ilyen verseny!");
        } else {
          
            con.query(`INSERT INTO versenyek (nev, leiras, evfolyam, kezdoidopont, zaroidopont) VALUES ("${regisztraciosnev}", "${regisztraciosleiras}", "${regisztraciosevfolyam}", "${regisztracioskezdoidopont}", "${regisztracioszaroidopont}", "${regisztracioscsoportidk}")`, function (err, result) {
                if (err) {
                    con.end();
                    return callback(`A ${regisztraciosnev} versenyt nem sikerült regisztrálni! Hiba: ` + err);
                }
                con.end();
                return callback(null, "Sikeres regisztráció!");
            });
        }
    });
}

module.exports = felhasznaloregisztracio;