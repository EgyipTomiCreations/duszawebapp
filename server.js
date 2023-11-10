const express = require("express")
const path = require('path');
const app = express()
const PORT = 3000;


let intialPath = path.join(__dirname, "public");

app.use(express.static(intialPath));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "webmester.html"));
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(intialPath, "about.html"));
})

app.listen(PORT, () =>{
    console.log(`A szerver fur a http://localhost:${PORT}`);
})