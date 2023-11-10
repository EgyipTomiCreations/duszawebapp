var config = require('./backend-config');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
  });

con.query(`USE ${config.adatbazisnev}`, function (err) {
    if (err) throw err;
});

con.query(`SELECT nev FROM felhasznalok WHERE nev = "${torlesinev}";`, function (err, result, fields) {
    if (err) throw err;
    if (result[0].nev == torlesinev)
    {
        hibauzenet = "Nem létezik ilyen felhasználó!";
    }
    else
    {
        con.query(`DELETE FROM felhasznalok WHERE nev = ${torlesinev}`, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
    }
        
});