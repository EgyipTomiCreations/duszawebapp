const storedTitle = localStorage.getItem('editedTitle');
const storedContent = localStorage.getItem('editedContent');

if (storedTitle) {
    document.getElementById('editableTitle').innerHTML = storedTitle;
}

if (storedContent) {
    document.getElementById('editableParagraph').innerHTML = storedContent;
}

async function saveChanges() {
    const editedTitle = document.getElementById('editableTitle').innerHTML;
    const editedContent = document.getElementById('editableParagraph').innerHTML;

    localStorage.setItem('editedTitle', editedTitle);
    localStorage.setItem('editedContent', editedContent);

    try {
    const imageArray = await konvertKepToArray();
    console.log('Kép buffer:', imageArray);
    kepbuffer = new TextDecoder().decode(imageArray);
    sendData(storedTitle, storedContent, kepbuffer);
    } catch (error) {
    console.error('Hiba történt:', error.message);
    }
    alert('Változtatások elmentve!');
}



function sendData(nev, leiras, kepbuffer) {
const kommunikaciosAdat = {};
kommunikaciosAdat.kategoria = "weblap";
kommunikaciosAdat.tipus = "modositas";
kommunikaciosAdat.nev = nev;
kommunikaciosAdat.leiras = leiras;
kommunikaciosAdat.kepbuffer = kepbuffer;

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


function konvertKepToArray() {
return new Promise((resolve, reject) => {
const input = document.getElementById('imageInput');
const file = input.files[0];

if (file) {
const reader = new FileReader();

reader.onload = (event) => {
const imageBuffer = new Uint8Array(event.target.result);
resolve(imageBuffer);
};

reader.onerror = (error) => {
reject(error);
};

reader.readAsArrayBuffer(file);
} else {
reject(new Error('Válassz ki egy képet!'));
}
});
}