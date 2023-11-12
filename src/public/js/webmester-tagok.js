const studentAdderForm = document.getElementById("studentAdderForm");
const newStudentAdderBtn = document.getElementById("newStudentAdderBtn");
const teacherListObj = document.getElementById("teacherListUl")
const juryListObj = document.getElementById('juryListUl')
let studentCounter = 0
let teacherCounter = 0
let juryCounter = 0

loadTeacher()
loadJury()


function loadJury(){
    console.log("Fut a jury tagok megjelenítése")

    const juryArray = []

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
            if(element.szerepkor == "Zsűritag"){
                juryCounter++
                if(juryCounter > 0){
                    const juryListPlaceholder = document.getElementById('juryListPlaceholder')
                    juryListPlaceholder.style.display = 'none'
                }
                const nameHolderDiv = document.createElement('div')
                nameHolderDiv.style.border = 'none'
                nameHolderDiv.style.width = '100%'
                nameHolderDiv.className="input-group mb-3"
                nameHolderDiv.style.marginBottom = '0px'
                const newJuryListElem = document.createElement('li')
                newJuryListElem.className="form-control"
                newJuryListElem.style = "color: gray;"
                newJuryListElem.innerHTML = element.nev
                juryListObj.appendChild(nameHolderDiv)
                const editButton = document.createElement('button')
                editButton.className="input-group-text"
                editButton.id = 'editButtonId'
                const editBtnImage = document.createElement('img')
                editBtnImage.src = '/src/img/icons/pencil.svg'
                editBtnImage.addEventListener('click', (e) => {
                    console.log(newJuryListElem.innerHTML)
                    $('#myModal').modal('show');
                })
                editButton.appendChild(editBtnImage)
                nameHolderDiv.appendChild(newJuryListElem)
                nameHolderDiv.appendChild(editButton)

            }
        });
    })
    .catch(error => {
        console.error(error);
    });
}




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
                localStorage.setItem(element.nev, element.id)
                teacherCounter++
                if(teacherCounter > 0){
                    const teacherListPlaceholder = document.getElementById('teacherListPlaceholder')
                    teacherListPlaceholder.style.display = 'none'
                }
                const nameHolderDiv = document.createElement('div')
                nameHolderDiv.style.border = 'none'
                nameHolderDiv.style.width = '100%'
                nameHolderDiv.className="input-group mb-3"
                nameHolderDiv.style.marginBottom = '0px'
                const newTeacherListElem = document.createElement('li')
                newTeacherListElem.className="form-control"
                newTeacherListElem.style = "color: gray;"
                newTeacherListElem.innerHTML = element.nev
                teacherListObj.appendChild(nameHolderDiv)
                const editButton = document.createElement('button')
                editButton.className="input-group-text"
                const editBtnImage = document.createElement('img')
                editBtnImage.src = '/src/img/icons/pencil.svg'
                editButton.appendChild(editBtnImage)
                nameHolderDiv.appendChild(newTeacherListElem)
                nameHolderDiv.appendChild(editButton)

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

document.getElementById('registerFullTeamBtn').addEventListener('click', (e) => {
    e.preventDefault()
    console.log("megkezdődik a regisztráció")
    registerTeamMember1()





})

function registerTeamMember1(){
    const kommunikaciosAdat = {}
        kommunikaciosAdat.kategoria = "felhasznalo"
        kommunikaciosAdat.tipus = "regisztracio"
        kommunikaciosAdat.nev = document.getElementById('fullNameInputField1').value,
        kommunikaciosAdat.jelszo = document.getElementById('studentPasswordInput1').value,
        kommunikaciosAdat.szerepkor = 'Versenyző',
        kommunikaciosAdat.evfolyam = document.getElementById('yearSelect').value,
        kommunikaciosAdat.osztalyjel = document.getElementById('classInputField').value

        //kommunikaciosAdat.evfolyam = document

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
    .then(uzenet =>{
        console.log(uzenet)
        registerTeamMember2()
    })

    .catch(error => {
        console.error(error);
    });
}

function registerTeamMember2(){
    const kommunikaciosAdat = {}
        kommunikaciosAdat.kategoria = "felhasznalo"
        kommunikaciosAdat.tipus = "regisztracio"
        kommunikaciosAdat.nev = document.getElementById('fullNameInputField2').value,
        kommunikaciosAdat.jelszo = document.getElementById('studentPasswordInput2').value,
        kommunikaciosAdat.szerepkor = 'Versenyző',
        kommunikaciosAdat.evfolyam = document.getElementById('yearSelect').value,
        kommunikaciosAdat.osztalyjel = document.getElementById('classInputField').value

        //kommunikaciosAdat.evfolyam = document

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
    .then(uzenet =>{
        console.log(uzenet)
        registerTeamMember3()
    })

    .catch(error => {
        console.error(error);
    });
}

function registerTeamMember3(){
    const kommunikaciosAdat = {}
        kommunikaciosAdat.kategoria = "felhasznalo"
        kommunikaciosAdat.tipus = "regisztracio"
        kommunikaciosAdat.nev = document.getElementById('fullNameInputField3').value,
        kommunikaciosAdat.jelszo = document.getElementById('studentPasswordInput3').value,
        kommunikaciosAdat.szerepkor = 'Versenyző',
        kommunikaciosAdat.evfolyam = document.getElementById('yearSelect').value,

        kommunikaciosAdat.osztalyjel = document.getElementById('classInputField').value

        //kommunikaciosAdat.evfolyam = document

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
    .then(uzenet =>{
        console.log(uzenet)
        getDatasetFromPlayers()
    })

    .catch(error => {
        console.error(error);
    });
}



function getDatasetFromPlayers() {
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
        console.log("Ez uzenet: ", uzenet)
        uzenet.forEach(element =>{
            localStorage.setItem(element.nev, element.id)
        })
        registerTeam()

    })
    .catch(error => {
        console.error(error);
    });
}

function registerTeam(){
    const kommunikaciosAdat = {}
        kommunikaciosAdat.kategoria = "csoport"
        kommunikaciosAdat.tipus = "regisztracio"
        kommunikaciosAdat.nev = document.getElementById('teamNameField').value,
        kommunikaciosAdat.tag1id = localStorage.getItem(document.getElementById('fullNameInputField1').value),
        kommunikaciosAdat.tag2id = localStorage.getItem(document.getElementById('fullNameInputField2').value),
        kommunikaciosAdat.tag3id = localStorage.getItem(document.getElementById('fullNameInputField3').value),
        kommunikaciosAdat.leiras = document.getElementById('teamNoteField').value
        kommunikaciosAdat.evfolyam = document.getElementById('yearSelect').value
        console.log("Ez az evfolyama a 3.nak: ", typeof parseInt(document.getElementById('yearSelect').value))
        //kommunikaciosAdat.evfolyam = document

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
        document.getElementById('setTeacherNameField').value = ''
        document.getElementById('setTeacherPasswordField').value = ''
        location.reload()
    })
    .catch(error => {
        console.error(error);
    });
}

function modifyTeacher(){
    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "felhasznalo";
    kommunikaciosAdat.tipus = "modositas";
    kommunikaciosAdat.nev = document.getElementById('setTeacherNameField').value;
    kommunikaciosAdat.jelszo = document.getElementById('setTeacherPasswordField').value;
    kommunikaciosAdat.szerepkor = "Tanar";

    //kommunikaciosAdat.id,
    //kommunikaciosAdat.nev,
    //kommunikaciosAdat.jelszo,
    //kommunikaciosAdat.szerepkor,
    //kommunikaciosAdat.evfolyam,
    //kommunikaciosAdat.osztalyjel,

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
    kommunikaciosAdat.szerepkor = "Zsűritag";

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
        document.getElementById('setJuryNameField').value = ''
        document.getElementById('setJuryPasswordField').value = ''
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