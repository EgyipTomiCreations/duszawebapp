

const studentAdderForm = document.getElementById("studentAdderForm");
const newStudentAdderBtn = document.getElementById("newStudentAdderBtn");
let studentCounter = 0

loadTeacher()

function loadTeacher(){
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
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
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById('registerTeacherForm').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(document.getElementById('setTeacherNameField').value)
})

document.getElementById('teacherCancelBtn').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('setTeacherNameField').value = ''
    document.getElementById('setTeacherPasswordField').value = ''
})

document.getElementById('registerTeacherForm').addEventListener('submit', (e) => {
    console.log("Én csinálok is valamit, nem ugy mint trepak!")
    registerTeacher()
})


function registerTeacher() {
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "regisztracio";
    kommunikaciosAdat.nev = document.getElementById('setTeacherNameField').value;
    kommunikaciosAdat.jelszo = document.getElementById('setTeacherPasswordField').value;
    kommunikaciosAdat.szerepkor = "Tanar";

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

loadJury()

function loadJury(){
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
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
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById('registerJuryForm').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(document.getElementById('setJuryNameField').value)
})

document.getElementById('juryCancelBtn').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('setJuryNameField').value = ''
    document.getElementById('setJuryPasswordField').value = ''
})

document.getElementById('registerJuryForm').addEventListener('submit', (e) => {
    console.log("Én csinálok is valamit, nem ugy mint trepak!")
    registerJury()
})

function registerJury() {
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "regisztracio";
    kommunikaciosAdat.nev = document.getElementById('setJuryNameField').value;
    kommunikaciosAdat.jelszo = document.getElementById('setJuryPasswordField').value;
    kommunikaciosAdat.szerepkor = "Zsuri";

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


if (newStudentAdderBtn){
    newStudentAdderBtn.addEventListener('click', () => {
        sendData();
        if(studentCounter < 3){
            studentCounter++
    
            const studentLabelP = document.createElement('p')
            studentLabelP.className = "fs-6"
            studentLabelP.innerHTML = studentCounter + ". versenyző"
            studentAdderForm.appendChild(studentLabelP)
    
            const formOutlineMb4Div = document.createElement('div')
            formOutlineMb4Div.className = "form-outline mb-4"
            studentAdderForm.appendChild(formOutlineMb4Div)
        
            const fullNameInput = document.createElement('input')
            fullNameInput.className = "form-control"
            fullNameInput.type = "text"
            fullNameInput.id = "fullNameInputField"
            fullNameInput.placeholder = "Teljes név"
            formOutlineMb4Div.appendChild(fullNameInput)
        }else{
            newStudentAdderBtn.disabled = true
        }
    
    })
}

function sendData() {
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "lekerdezes";
    kommunikaciosAdat.id = 10;
    kommunikaciosAdat.nev = "Solymosi Tamás";
    kommunikaciosAdat.jelszo = "asd124";
    kommunikaciosAdat.szerepkor = "Webmester";
    kommunikaciosAdat.evfolyam = 11;
    kommunikaciosAdat.osztalyjel = "C";

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



/*<div class="modal-body">
    <form>      
        <div class="form-outline mb-4">
            <input type="email" id="form2Example11" class="form-control"
            placeholder="Teljes név" />
        </div>   

        <div class="form-outline mb-4">
            <input type="text" id="form2Example11" class="form-control" placeholder="Osztály" maxlength="2"/>
        </div>                   

    </form>
</div>*/