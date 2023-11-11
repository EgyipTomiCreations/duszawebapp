var config = require('./backend-config');
var mysql = require('mysql');

function csoportlekerdezes(callback){

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

  con.query("SELECT csoportok.nev AS csoportnev, f1.nev AS tag1nev, f2.nev AS tag2nev, f3.nev AS tag3nev FROM csoportok JOIN felhasznalok f1 ON csoportok.tag1id = f1.id JOIN felhasznalok f2 ON csoportok.tag2id = f2.id JOIN felhasznalok f3 ON csoportok.tag3id = f3.id;", function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a csoportok lekérése közben!: "+err);
    }
        var adatlista = [];
                result.forEach(element => {
                    var adatobjektum = {
                        csoportnev: element.csoportnev,
                        tag1nev: element.tag1nev,
                        tag2nev: element.tag2nev,
                        tag3nev: element.tag3nev
                    };
                    adatlista.push(adatobjektum);
        });
        con.end();
        callback(null,adatlista);
    });
}

module.exports = csoportlekerdezes;