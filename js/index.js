const express = require("express");

const cors = require("cors"); //Importante para que no haya conflicto por diferentes direcciones

const app = express();

app.use(cors());

app.use(express.json());

app.get('/categories', (req, res) => {
    res.json({message: "Hola, soy tu"});
})

app.listen(3000, () =>{
    console.log("Serve on port 3000");
});
