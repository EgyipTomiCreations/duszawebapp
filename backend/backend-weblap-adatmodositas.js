var config = require('./backend-config');
var mysql = require('mysql');
const fs = require("fs");
const { callbackify } = require('util');

function weblapadatmodositas(modositottnev, modositottleiras, modositottikonutvonal, callback){

kepbuffer = Buffer.from(fs.readFileSync(modositottikonutvonal), "base64").toString();

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

con.query(`UPDATE weblapadatok SET nev = ${modositottnev}, leiras = ${modositottleiras}, ikonbase64 = ${kepbuffer} WHERE id = 0;`, function (err, result, fields) {
  if (err) 
  {
    con.end();
    return callback("Nem sikerült a weblap adatokat firssíteni! Hiba:"+err);
  }
  con.end();
  return callback(null, "Sikerült a weblap adatokat firssíteni!");
      
  });
}

module.exports = weblapadatmodositas;