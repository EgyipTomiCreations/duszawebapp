var config = require('./backend-config');
var mysql = require('mysql');

function feladatlekerdezes(id, callback){

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
  if (id != null)
  {
    con.query(`SELECT felhasznalok.nev, feladatok.feladat, feladatok.evfolyam FROM feladatok, felhasznalok WHERE feladatok.tanarid = felhasznalok.id; AND feladatok.id = ${id}`, function (err, result) {
      if (err)
      {
        con.end();
        callback("Hiba a feladatok lekérése közben!: "+err);
      }
          con.end();
          callback(null,result);
      });
  }

  con.query("SELECT felhasznalok.nev, feladatok.feladat, feladatok.evfolyam FROM feladatok, felhasznalok WHERE feladatok.tanarid = felhasznalok.id;", function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a feladatok lekérése közben!: "+err);
    }
        var adatlista = [];
                result.forEach(element => {
                    var adatobjektum = {
                        feladat: element.feladat,
                        tanarnev: element.nev,
                        evfolyam: element.evfolyam
                    };
                    adatlista.push(adatobjektum);
        });
        con.end();
        callback(null,adatlista);
    });
}

module.exports = feladatlekerdezes;

    

    