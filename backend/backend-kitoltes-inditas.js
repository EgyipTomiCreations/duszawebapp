var config = require('./backend-config');
var mysql = require('mysql');

function kitoltesinditas(versenyzoid, ido, callback) {
    console.log(ido);
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
    var datum = Date.parse(ido)
    var mysqlido = datum.toISOString().slice(0, 19).replace('T', ' ');
    console.log(mysqlido);

            con.query(`INSERT INTO kitoltesek (versenyzoid, kezdoidopont) VALUES ("${versenyzoid}", "${mysqlido}")`, function (err, result) {
                if (err) {
                    con.end();
                    return callback(`A kitöltést nem sikerült elindítani! Hiba: ` + err);
                }
                con.end();
                return callback(null, "Sikeres indítás!");
            });
        }
module.exports = kitoltesinditas;