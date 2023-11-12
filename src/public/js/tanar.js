let mainStr = ""

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
