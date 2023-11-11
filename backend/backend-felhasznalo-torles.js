var config = require('./backend-config');
var mysql = require('mysql');

function felhasznalotorles(torlesinev, callback) {
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
        if (err) 
        {
          con.end();
          return callback("Nem sikerült az adatbázis használatba venni! Hiba: "+err);
        }
        
      });

    con.query(`SELECT nev FROM felhasznalok WHERE nev = "${torlesinev}";`, function (err, result, fields) {
        if (err) 
        {
            con.end();
            return callback("Hiba a felhasználók lekérése közben: "+err);
        }

        if (result.length > 0 && result[0].nev === torlesinev) {
            con.query(`DELETE FROM felhasznalok WHERE nev = '${torlesinev}'`, function (err, result) {
                if (err)
                {
                    con.end();
                    return callback(`Hiba ${torlesinev} felhasználó törlése közben: `+err);
                }
                con.end();
                return callback(null, result);
            });
        } else {
            con.end();
            return callback(`Nem létezik ${torlesinev} néven felhasználó!`);
        }
    });
}

module.exports = felhasznalotorles;