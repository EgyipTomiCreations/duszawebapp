document.getElementById('logoutBtn').addEventListener("click", (e)=>{
    localStorage.clear();
    location.href = '/';
})

document.getElementById("nameTag").innerHTML = localStorage.getItem("Nev") + " - Tanar";

document.addEventListener('DOMContentLoaded', function () {
    const versenyForm = document.getElementById('versenyForm');

    versenyForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Az űrlap adatainak gyűjtése
        const nev = document.getElementById('nev').value;
        const leiras = document.getElementById('leiras').value;
        const evfolyam = document.getElementById('evfolyam').value;
        const kezdetiIdo = document.getElementById('kezdetiIdo').value;
        const vegiIdo = document.getElementById('vegiIdo').value;
        const csapatok = document.getElementById('csapatok').value;

        // További adatok gyűjtése a formból

        // Elküldés a szerverre (itt a szerver URL-jét kell beállítani)
        sendDataToServer(nev, leiras, evfolyam, kezdetiIdo, vegiIdo, csapatok);

        // További mezők törlése vagy egyéb műveletek végrehajtása

        alert('Verseny sikeresen létrehozva!');
    });

    
});