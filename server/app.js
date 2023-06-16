const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.send("Hello world");
});


app.listen(4000);
console.log("Escuchando desde el puerto 4000");