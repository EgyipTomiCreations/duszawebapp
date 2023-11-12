const studentAdderForm = document.getElementById("studentAdderForm");
const newStudentAdderBtn = document.getElementById("newStudentAdderBtn");
let studentCounter = 0

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