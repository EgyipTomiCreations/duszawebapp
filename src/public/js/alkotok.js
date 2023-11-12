document.getElementById('logoutBtn').addEventListener("click", (e) => {
    localStorage.clear();
    location.href = '/';
});

const nev = localStorage.getItem("Nev");
document.getElementById("nameTag").innerHTML = nev !== null ? nev : "Vendég";