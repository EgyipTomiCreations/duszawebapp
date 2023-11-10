const studentAdderForm = document.getElementById("studentAdderForm");
const newStudentAdderBtn = document.getElementById("newStudentAdderBtn");
let studentCounter = 0


newStudentAdderBtn.addEventListener('click', () => {
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