document.getElementById('form1Id').addEventListener('submit', (e) => {
    e.preventDefault();
    sendData().then((felhasznalo) => {
        console.log(felhasznalo);
        if(felhasznalo.siker == false){
            console.log('false')
            const toastTrigger = document.getElementById('loginBtn')
            const toastLiveExample = document.getElementById('wrongLoginToast')

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
        }
        if (felhasznalo.uzenet.szerepkor == "Webmester") {
            localStorage.setItem("Privilage", "Webmester");
            localStorage.setItem("Nev", felhasznalo.uzenet.nev);
            location.href = '/webmester';
        }
        if (felhasznalo.uzenet.szerepkor == "Tanár") {
            localStorage.setItem("Privilage", "Tanár");
            localStorage.setItem("Nev", felhasznalo.uzenet.nev);
            location.href = '/tanar';
            localStorage.setItem("TanarID", felhasznalo.uzenet.id)
        }
        if (felhasznalo.uzenet.szerepkor == "Zsuri") {
            localStorage.setItem("Privilage", "Zsuri");
            localStorage.setItem("Nev", felhasznalo.uzenet.nev);
            location.href = '/zsuri';
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