loadJury()


function loadJury(){

    fealadarray = []

    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "feladat";
    kommunikaciosAdat.tipus = "lekerdezes";

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
        uzenet.uzenet.forEach(element => {
            console.log("Element", element)
        });
        
    })
    .catch(error => {
        console.error(error);
    });
}