

const studentAdderForm = document.getElementById("studentAdderForm");
const newStudentAdderBtn = document.getElementById("newStudentAdderBtn");
const teacherListObj = document.getElementById("teacherListUl")
let studentCounter = 0
let teacherCounter = 0

loadTeacher()


function loadTeacher(){
    const teacherArray = []

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
        uzenet.forEach(element => {
            if(element.szerepkor == "Tanár"){
                teacherCounter++
                if(teacherCounter > 0){
                    const teacherListPlaceholder = document.getElementById('teacherListPlaceholder')
                    teacherListPlaceholder.style.display = 'none'
                }
                console.log(element.nev)
                const newTeacherListElem = document.createElement('li')
                newTeacherListElem.className = 'list-group-item'
                newTeacherListElem.style = "color: gray;"
                newTeacherListElem.innerHTML = element.nev
                teacherListObj.appendChild(newTeacherListElem)

            }
        });
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
    registerTeacher()
})

function registerTeam(){
    const kommunikaciosAdat = {}
        kommunikaciosAdat.kategoria = "csoport"
        kommunikaciosAdat.tipus = "regisztracio"
        kommunikaciosAdat.nev = document.getElementById('teamNameField').value,
        kommunikaciosAdat.tag1id = document.getElementById('fullNameInputField1').value,
        kommunikaciosAdat.tag2id = document.getElementById('fullNameInputField2').value,
        kommunikaciosAdat.tag3id = document.getElementById('fullNameInputField3').value,
        kommunikaciosAdat.leiras = document.getElementById('teamNoteField').value

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
        document.getElementById('teamNameField').innerHTML = ''
        document.getElementById('fullNameInputField1').innerHTML = '',
        document.getElementById('fullNameInputField2').innerHTML = '',
        document.getElementById('fullNameInputField3').innerHTML = '',
        document.getElementById('studentPasswordInput1').innerHTML = '',
        document.getElementById('studentPasswordInput2').innerHTML = '',
        document.getElementById('studentPasswordInput3').innerHTML = '',
        document.getElementById('teamNoteField').innerHTML = ''

        location.reload()
    })
    .catch(error => {
        console.error(error);
    });
}


function registerTeacher(){
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "regisztracio";
    kommunikaciosAdat.nev = document.getElementById('setTeacherNameField').value
    kommunikaciosAdat.jelszo = document.getElementById('setTeacherPasswordField').value
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
        document.getElementById('setTeacherNameField').value = ''
        document.getElementById('setTeacherPasswordField').value = ''
        location.reload()
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
            fullNameInput.id = "fullNameInputField" + studentCounter
            fullNameInput.required = 'true'
            fullNameInput.placeholder = "Teljes név"
            formOutlineMb4Div.appendChild(fullNameInput)

            const studentPasswordInput = document.createElement('input')
            studentPasswordInput.className = "form-control"
            studentPasswordInput.type = "text"
            studentPasswordInput.style.marginTop = "10px"
            studentPasswordInput.id = "studentPasswordInput" + studentCounter
            studentPasswordInput.required = 'true'
            studentPasswordInput.placeholder = "Jelszó beállítása"
            formOutlineMb4Div.appendChild(studentPasswordInput)
            if(studentCounter == 3){
                newStudentAdderBtn.disabled = true
            }
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