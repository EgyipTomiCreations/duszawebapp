document.getElementById('logoutBtn').addEventListener("click", (e) => {
    console.log('Kijelentkezés gombra kattintva.');
    localStorage.clear();
    location.href = '/';
});

const nev = localStorage.getItem("Nev");
document.getElementById("nameTag").innerHTML = nev !== null ? nev : "Vendég";

fetch('adatok.json')
        .then(response => response.json())
        .then(jsonData => {
            // HTML elemek létrehozása
            var titleElement = document.createElement("h1");
            titleElement.textContent = jsonData.nev;

            var paragraphElement = document.createElement("p");
            paragraphElement.innerHTML = jsonData.leiras;

            // Stílusok beállítása
            titleElement.style.textAlign = "center";
            titleElement.style.marginTop = "75px";  // Cím középre igazítása
            titleElement.style.fontWeight = "bold";
            paragraphElement.style.marginLeft = "25%"; // Bekezdés margin beállítása
            paragraphElement.style.marginRight = "25%";
            paragraphElement.style.marginTop = "50px";
            paragraphElement.style.fontSize = "20px";

            // HTML elemeket hozzáadom a kiválasztott elemhez
            var targetElement = document.getElementById('adatok-helye');
            targetElement.appendChild(titleElement);
            targetElement.appendChild(paragraphElement);

            // Megjelenítjük a képet
            displayImage(jsonData.kepbuffer);
        })
        .catch(error => console.error('Hiba történt:', error));

const versenyGomb = document.getElementById('versenyGomb');
const versenyIdeje = new Date('2023-11-12T20:00:00');
const most = new Date();

console.log('Most:', most);
console.log('Verseny ideje:', versenyIdeje);

if (most >= versenyIdeje) {
    versenyGomb.removeAttribute('disabled');
    console.log('A gomb most már aktív.');
} else {
    console.log('A gomb még mindig nem aktív.');
    versenyGomb.setAttribute('disabled', 'true');
}

// Csapatok megjelenítése
function megjelenitCsapatok() {
    // Itt lehetne megvalósítani a csapatok megjelenítését
    // Példa: Ajax hívás, adatbázisból lekérés stb.
}

// Gomb kattintás eseménykezelője
versenyGomb.addEventListener('click', () => {
    // Átirányítás a Verseny oldalra
    window.location.href = '/verseny'; // Módosítsd az elérési utat az aktuális oldal elérési útjára
});


function displayImage(kepbuffer) {
    const imageArray = new TextEncoder().encode(kepbuffer);
    const blob = new Blob([imageArray], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = '';

    // Az 'imageContainer' a kép megjelenítésére szolgáló konténer elem
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.appendChild(imageElement);
}