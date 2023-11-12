let mainStr = ""
let feladatCounter = 0
const feladatListObj = document.getElementById("feladatListObj")
is5Created = false
is6Created = false
is7Created = false
is8Created = false

//5
const fifthGradeFeladatokul = document.createElement('ul')
fifthGradeFeladatokul.className = "list-group-item"
fifthGradeFeladatokul.style = "color: gray"
fifthGradeFeladatokul.style.width = '400px'
feladatListObj.appendChild(fifthGradeFeladatokul)
const fifthPlaceHolder = document.createElement('li')
fifthPlaceHolder.innerHTML = '5. évfolyam'
fifthGradeFeladatokul.appendChild(fifthPlaceHolder)
//6
const sixthGradeFeladatokul = document.createElement('ul')
sixthGradeFeladatokul.className = "list-group-item"
sixthGradeFeladatokul.style = "color: gray"
sixthGradeFeladatokul.style.width = '400px'
feladatListObj.appendChild(sixthGradeFeladatokul)
const sixthPlaceHolder = document.createElement('li')
sixthPlaceHolder.innerHTML = '6. évfolyam'
sixthGradeFeladatokul.appendChild(sixthPlaceHolder)
//7
const seventhGradeFeladatokul = document.createElement('ul')
seventhGradeFeladatokul.className = "list-group-item"
seventhGradeFeladatokul.style = "color: gray"
seventhGradeFeladatokul.style.width = '400px'
feladatListObj.appendChild(seventhGradeFeladatokul)
const seventhPlaceHolder = document.createElement('li')
seventhPlaceHolder.innerHTML = '7. évfolyam'
seventhGradeFeladatokul.appendChild(seventhPlaceHolder)
//8
const eightGradeFeladatokul = document.createElement('ul')
eightGradeFeladatokul.className = "list-group-item"
eightGradeFeladatokul.style = "color: gray"
eightGradeFeladatokul.style.width = '400px'
feladatListObj.appendChild(eightGradeFeladatokul)
const eightPlaceHolder = document.createElement('li')
eightPlaceHolder.innerHTML = '8. évfolyam'
eightGradeFeladatokul.appendChild(eightPlaceHolder)


getFeladatok()

document.getElementById('logoutBtn').addEventListener("click", (e)=>{
    localStorage.clear();
    location.href = '/';
})

document.getElementById("nameTag").innerHTML = localStorage.getItem("Nev") + " - Tanár";


function getFeladatok(){

    const kommunikaciosAdat = {};
    kommunikaciosAdat.kategoria = "feladat"
    kommunikaciosAdat.tipus = "lekerdezes"

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
        uzenet.uzenet.forEach(feladat => {
            console.log("Feladat:", feladat.feladat);
            
            switch (feladat.evfolyam){
                case 5:
                    const fifthGradeFeladatokP = document.createElement('li')
                    fifthGradeFeladatokP.className = 'list-group-item'
                    fifthGradeFeladatokP.innerHTML = feladat.feladat
                    fifthGradeFeladatokul.append(fifthGradeFeladatokP)
                    break

                case 6:

                    const sixthGradeFeladatokP = document.createElement('li')
                    sixthGradeFeladatokP.className = 'list-group-item'
                    sixthGradeFeladatokP.innerHTML = feladat.feladat
                    sixthGradeFeladatokul.append(sixthGradeFeladatokP)
                    break
                    
                case 7:

                    const seventhGradeFeladatokP = document.createElement('li')
                    seventhGradeFeladatokP.className = 'list-group-item'
                    seventhGradeFeladatokP.innerHTML = feladat.feladat
                    seventhGradeFeladatokul.append(seventhGradeFeladatokP)
                    break
                    
                case 8:

                    const eightGradeFeladatokP = document.createElement('li')
                    eightGradeFeladatokP.className = 'list-group-item'
                    eightGradeFeladatokP.innerHTML = feladat.feladat
                    eightGradeFeladatokul.append(eightGradeFeladatokP)
                    break
                    
            }
        });
    })
    .catch(error => {
        console.error(error);
    });
}




document.getElementById('saveBtn').addEventListener('click', (e)=>{
    var fileInput = document.getElementById('inputfile');
    if (fileInput.files.length > 0) {

      var file = fileInput.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {

        var content = event.target.result;

        var sorok = content.split('\n')

        var sorSzám = 0


        //itt csekklojuk a 
        sorok.forEach(function(sor) {
            sorSzám++
            console.log("!!!!!!!Ez itt egy ártatlan szelíd sor: ", sor);

            console.log("Ez a content sor: ", sor);

            if(wordCounter(sor) == 5){

                if(Number.isInteger(parseInt(sor.split(' ')[4])) == true){

                    if(parseInt(sor.split(' ')[4]) > 4 && parseInt(sor.split(' ')[4]) < 9){

                        if(maganhangzoSzamolas(sor.split(' ')[3]) > 2){

                            console.log("ÁTMENT!!!")
                            //console.log(`${sor.split(' ')[0]} ${sor.split(' ')[1]} ${sor.split(' ')[2]} ${sor.split(' ')[3]}`)

                            uploadFeladat()

                            function uploadFeladat(){
                                console.log("Fut a feladatfeltöltés")
                                console.log(`Ez lenne a feltöltés: ${sor.split(' ')[0]} ${sor.split(' ')[1]} ${sor.split(' ')[2]} ${sor.split(' ')[3]}`)
                                const kommunikaciosAdat = {};
                                kommunikaciosAdat.kategoria = "feladat"
                                kommunikaciosAdat.tipus = "feltoltes"
                                kommunikaciosAdat.feladat = `${sor.split(' ')[0]} ${sor.split(' ')[1]} ${sor.split(' ')[2]} ${sor.split(' ')[3]}`
                                kommunikaciosAdat.tanarid = localStorage.getItem('TanarID'),
                                kommunikaciosAdat.evfolyam = sor.split(' ')[4]
                            
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
                                    document.getElementById('inputfile').innerHTML = ''
                                    location.reload()
                            
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            }

                            //itt van az hogy a sorral minden rendbe, csak be kell rakni az adatbázisba

                        }else{
                            //TODO: hibakezelés a nem min. 3 magánhangzóra
                            console.log("//TODO: hibakezelés a nem min. 3 magánhangzóra")
                            const toastTrigger = document.getElementById('saveBtn')
                            const toastLiveExample = document.getElementById('wrongImportFormatNotify')
                            const message = document.getElementById('notifyMessage')
                
                            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                            message.innerHTML = 'Az egyik sorban az utolsó szó nem tartalmaz min. 3 magánhangzót'
                            toastBootstrap.show()
                        }


                    }else{
                        //TODO: hibakezelés a nem 5 - 8ig osztályokra
                        console.log("//TODO: hibakezelés a nem 5 - 8ig osztályokra")
                        const toastTrigger = document.getElementById('saveBtn')
                        const toastLiveExample = document.getElementById('wrongImportFormatNotify')
                        const message = document.getElementById('notifyMessage')
            
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        message.innerHTML = 'Az egyik sorban a szám nem 5 és 8 között van'
                        toastBootstrap.show()
                    }

                }else{
                    //TODO: hibakezelés hogy a negyedik szó nem szám
                    console.log("//TODO: hibakezelés hogy a negyedik szó nem szám")
                    const toastTrigger = document.getElementById('saveBtn')
                    const toastLiveExample = document.getElementById('wrongImportFormatNotify')
                    const message = document.getElementById('notifyMessage')
        
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    message.innerHTML = 'Az egyik sorban a negyedik elem nem szám'
                    toastBootstrap.show()
                }

            }else{
                if(sorSzám > 1 && sor == ""){
                    console.log("Ez a sorSzám debug false")
                    const toastTrigger = document.getElementById('saveBtn')
                    const toastLiveExample = document.getElementById('wrongImportFormatNotify')
                    const message = document.getElementById('notifyMessage')
        
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    message.innerHTML = 'A fájlban található üres sor(ok)'
                    toastBootstrap.show()
                }else{
                    // TODO: hibakezelés a túl rövid sorra
                    console.log("// TODO: hibakezelés a túl rövid sorra")
                    const toastTrigger = document.getElementById('saveBtn')
                    const toastLiveExample = document.getElementById('wrongImportFormatNotify')
                    const message = document.getElementById('notifyMessage')
        
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    message.innerHTML = 'Az egyik sor nem felel meg a megfeleő formátumnak <br> (szó, szó, szó, szó, évfolyam)'
                    toastBootstrap.show()
                }
            }
          });

      };

      reader.readAsText(file);
    } else {
      console.log("Válassz ki egy fájlt!");
    }
          
})

function wordCounter(mainString){
    var words = mainString.split(' ')
    var wordNumber = words.length
    return wordNumber
}

function maganhangzoSzamolas(szoveg) {
    // A magánhangzók listája
    var maganhangzok = "aáeéiíoóöőuúüűAÁEÉIÍOÓÖŐUÚÜŰ";

    // A szöveg karaktereinek számolása
    var szam = 0;

    // Minden karakter ellenőrzése
    for (var i = 0; i < szoveg.length; i++) {
        // Ha a karakter a magánhangzók közé tartozik, növeljük a számolót
        if (maganhangzok.indexOf(szoveg[i]) !== -1) {
            szam++;
        }
    }

    return szam;
}
