document.getElementById('form1Id').addEventListener('submit', (e) => {
    e.preventDefault();
    sendData().then((felhasznalo) => {
        if (felhasznalo.uzenet.szerepkor == "Webmester") {
            location.href = '/webmester';
            localStorage.setItem("Privilage", "Webmester")
        }
    });
});

function sendData() {
    return new Promise((resolve, reject) => {
        const kommunikaciosAdat = {};
        kommunikaciosAdat.kategoria = "felhasznalo";
        kommunikaciosAdat.tipus = "bejelentkezes";
        kommunikaciosAdat.nev = document.getElementById("usernameText").value;
        kommunikaciosAdat.jelszo = document.getElementById("passwordText").value;

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
            resolve(uzenet);
        })
        .catch(error => {
            reject(error);
        });
    });
}