var config = require('./backend-config');
var mysql = require('mysql');

function csoportmodositas(id, modositottnev, modositotttag1id, modositotttag2id, modositotttag3id, modositottleiras, callback){
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

  con.query(`SELECT nev FROM felhasznalok
              WHERE id = (
              SELECT COALESCE(
              (SELECT tag1id FROM csoportok WHERE tag1id IN (${tag1id}, ${tag2id}, ${tag3id}) AND id != ${id}),
              (SELECT tag2id FROM csoportok WHERE tag2id IN (${tag1id}, ${tag2id}, ${tag3id}) AND id != ${id}),
              (SELECT tag3id FROM csoportok WHERE tag3id IN (${tag1id}, ${tag2id}, ${tag3id}) AND id != ${id})));`, function (err, result) {
    if (err) {
        con.end();
        return callback(`Nem sikerült ${nev} csoport helyességét ellenőrizni! Hiba: ` + err);
    }
    if (result[0].nev == null)
    {
      con.query(`UPDATE csoportok SET nev = "${modositottnev}", tag1id = "${modositotttag1id}", tag2id = "${modositotttag2id}", tag3id = "${modositotttag3id}", leiras = "${modositottleiras}", evfolyam = "${evfolyam}" WHERE id = ${id}`, function (err, result) {
        if (err)
        {
          con.end();
          callback("Hiba a csoport módosítása közben: "+err);
        }
        con.end();
        callback(null, "Sikeres csoport adatmódosítás!")    
    });
    }
    else
    {                          
        con.end(); 
        return callback(`Hiba! ${result[0].nev} felhasználó már megtalálható más csoportban`);
    }
});
}

module.exports = csoportmodositas;
