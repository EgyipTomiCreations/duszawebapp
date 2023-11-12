var config = require('./backend-config');
var mysql = require('mysql');

function feladatfeltoltes(feladat, tanarid, evfolyam, callback) {
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

    con.query(`SELECT id FROM feladatok WHERE feladat = "${feladat} AND tanarid = ${tanarid} AND evfolyam = ${evfolyam}";`, function (err, result) {
        if (err) {
            con.end();
            return callback("Hiba a feladatok lekérdezése közben!" + err);
        }

        if (result && result[0] && result[0].nev == regisztraciosnev) {
            con.end();
            return callback("Hiba! Már létezik egy ugyan ilyen feladat!");
        } else {
          
            con.query(`INSERT INTO feladatok (feladat, tanarid, evfolyam) VALUES ("${feladat}", "${tanarid}", "${evfolyam}")`, function (err, result) {
                if (err) {
                    con.end();
                    return callback("Hiba! A feladatot nem sikerült regisztrálni: " + err);
                }
                con.end();
                return callback(null, "Sikeres regisztráció!");
            });
        }
    });
}

module.exports = feladatfeltoltes;