const feladatfeltoltes = require("../../../backend/backend-feladat-feltoltes")

feladatCount = 0
feladatNow = 1
feladatarray = []
megoldasValaszArray = [{}]

loadJury()

const mainHolder = document.getElementById('mainHolder')
const firstHolderDiv = document.createElement('div')
mainHolder.appendChild(firstHolderDiv)

const id1 = document.getElementById('1')
const id2 = document.getElementById('2')
const id3 = document.getElementById('3')
const id4 = document.getElementById('4')
const nextFeladat = document.getElementById('nextFeladat')
const finishBtn = document.getElementById('finishBtn')
mehet = false



function loadJury(){


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


            if(element.evfolyam == parseInt(localStorage.getItem("Evfolyam"))){
                feladatCount++
                console.log("True")
                feladatarray.push(element.feladat)
            }

        });
        document.getElementById('feladatCounterh1').innerHTML = `${feladatNow}/${feladatCount} feladat`
        console.log("Ez az array", feladatarray)

        console.log(feladatNow)

        id1.innerHTML = feladatarray[feladatNow-1].split(' ')[0]
        id2.innerHTML = feladatarray[feladatNow-1].split(' ')[1]
        id3.innerHTML = feladatarray[feladatNow-1].split(' ')[2]
        kevert = osszekeverString(feladatarray[feladatNow-1].split(' ')[3])
        id4.innerHTML = kevert

        nextFeladat.addEventListener('click', (e) =>{
            feladatNow++
            if(feladatNow <= feladatarray.length){
                document.getElementById('feladatCounterh1').innerHTML = `${feladatNow}/${feladatCount} feladat`
                console.log("Benne" ,feladatNow)
                feladatarray[feladatNow-1]
                id1.innerHTML = feladatarray[feladatNow-1].split(' ')[0]
                id2.innerHTML = feladatarray[feladatNow-1].split(' ')[1]
                id3.innerHTML = feladatarray[feladatNow-1].split(' ')[2]
                kevert = osszekeverString(feladatarray[feladatNow-1].split(' ')[3])
                id4.innerHTML = kevert
                megoldasValaszArray.push({
                    "megoldas" : feladatarray[feladatNow-1].split(' ')[3],
                    "valasz" : document.getElementById('valaszText')
                });
                console.log(megoldasValaszArray);
                if(feladatNow == feladatarray.length){
                    nextFeladat.disabled = 'true'
                    finishBtn.display = 'block'
                }
            }
        })
        




        
    })
    .catch(error => {
        console.error(error);
    });
}

function osszekeverString(inputString) {
    let characters = inputString.split('');
    // Fisher-Yates algoritmus alkalmazása a tömb keverésére
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('');
}
