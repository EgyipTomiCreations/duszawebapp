var config = require('./backend-config');
var mysql = require('mysql');

function felhasznalolekerdezes(callback){

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

  con.query("SELECT * FROM felhasznalok;", function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a felhasználók lekérése közben!: "+err);
    }
        var adatlista = [];
                result.forEach(element => {
                    var adatobjektum = {
                        id: element.id,
                        nev: element.nev,
                        jelszo: element.jelszo,
                        szerepkor: element.szerepkor,
                        evfolyam: element.evfolyam,
                        osztalyjel: element.osztalyjel
                    };
                    adatlista.push(adatobjektum);
        });
        con.end();
        callback(null,adatlista);
    });
}

module.exports = felhasznalolekerdezes;

    

    