var config = require('./backend-config');
var mysql = require('mysql');
const path = require('path');
const fs = require("fs");

function weblapadatlekerdezes(callback) {
  var nev = "";
  var leiras = "";
  var gyokerkonyvtar = path.join(__dirname, '../');
  var kepbuffer;

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

  con.query("SELECT nev, leiras, ikonbase64 FROM weblapadatok WHERE id = 0;", function (err, result) {
    if (err) {
      con.end();
      return callback(err);
    }
    var adatobjektum = {};
    adatobjektum.nev = result[0].nev;
    adatobjektum.leiras = result[0].leiras;
    kepbuffer = Buffer.from(result[0].ikonbase64, 'base64');
    fs.writeFileSync(gyokerkonyvtar + "/src/img/logo.svg", kepbuffer);
    if (err || kepbuffer == 0)
    {
      callback("Hiba! Nem sikerült a weblap képét előállítani! "+ err);
    }
    con.end();
    console.log(adatobjektum);
    fs.writeFile(gyokerkonyvtar + "/adatok.json", JSON.stringify(adatobjektum), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Weblap adatok mentve!");
  });
    return callback(null, adatobjektum); 
  });
}

module.exports = weblapadatlekerdezes;