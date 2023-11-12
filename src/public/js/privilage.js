document.getElementById('logoutBtn').addEventListener("click", (e)=>{
    localStorage.clear();
    location.href = '/';
})
document.getElementById("nameTag").innerHTML = localStorage.getItem("Nev") + " - " + localStorage.getItem("Privilage");