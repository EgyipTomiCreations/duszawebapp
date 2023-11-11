bejelentkezesBtn = document.getElementById("loginBtn");
felhaszanlonevText = document.getElementById("usernameText");
jelszoText = document.getElementById("passwordText");

bejelentkezesBtn.addEventLister('click', (e) => {
    e.preventDefault();
    sendData();
})

function sendData() {
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "bejelentkezes";
    kommunikaciosAdat.nev = felhaszanlonevText.value;
    kommunikaciosAdat.jelszo = jelszoText.value;

    const dataString = JSON.stringify({ data: kommunikaciosAdat });
    const contentLength = dataString.length;

    fetch('/adatKuldes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': contentLength.toString(),
        },
        body: dataString,
    })
    .then(response => response.json())
    .then(uzenet => {
        console.log(uzenet);
    })
    .catch(error => {
        console.error(error);
    });
}