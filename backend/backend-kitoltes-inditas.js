var config = require('./backend-config');
var mysql = require('mysql');

function kitoltesinditas(versenyzoid, ido, callback) {
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

            con.query(`INSERT INTO kitoltesek (versenyzoid, kezdoidopont) VALUES ("${versenyzoid}", "${ido}"`, function (err, result) {
                if (err) {
                    con.end();
                    return callback(`A ${regisztraciosnev} kitöltést nem sikerült elindítani! Hiba: ` + err);
                }
                con.end();
                return callback(null, "Sikeres indítás!");
            });
        }
module.exports = kitoltesinditas;