var config = require('./backend-config');


function felhasznalobejelentkezes(bejelentkezesinev, bejelentkezesijelszo){

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

  con.query(`SELECT nev FROM felhasznalok WHERE nev = "${bejelentkezesinev}";`, function (err, result, fields) {
    if (err)
    {
      con.end();
      callback("Hiba a felhasználó lekérdezése közben!"+err);
    }
    if (result[0].nev == bejelentkezesinev)
    {
        con.query(`SELECT * FROM felhasznalok WHERE jelszo = "${bejelentkezesijelszo}" AND nev = "${bejelentkezesinev}";`, function (err, result) {
            if (err) 
            {
              con.end();
              callback("Hiba a felhasználó jelszavának ellenőrzése közben!");
            }        
            if (result[0].jelszo == bejelentkezesijelszo)
             {
                con.end();
                felhasznalotulajdonsagok = {};
                felhasznalotulajdonsagok.id = result[0].id;
                felhasznalotulajdonsagok.nev = result[0].nev;
                felhasznalotulajdonsagok.szerepkor = result[0].szerepkor;
                if (result[0].evfolyam != 0) {
                  felhasznalotulajdonsagok.evfolyam = result[0].evfolyam;
                }
                felhasznalotulajdonsagok.osztalyjel = result[0].osztalyjel; 
                callback(null, felhasznalotulajdonsagok);
                
            }
            else
            {
              con.end();
              callback("Hibás jelszó!");
            }            
        });
    }
    else
        con.end();
        callback("Nem létezik felhasználó ilyen névvel!");
    });


}

module.exports = felhasznalobejelentkezes;