const express = require("express");

const PORT = 5000;
const API_BASE_PATH = "/api";

const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(express.json()); // middleware global


/*Animales*/
const listAnimals = [
    {
      name: "perrito",
      specie: "mamifero",
    },
    {
      name: "pelusa",
      specie: "mamifero",
    },
    {
      name: "willy",
      specie: "cetaceo",
    },
    {
      name: "sebastian",
      specie: "crustaceo",
    },
  ];

app.get(`${API_BASE_PATH}/animals`, (req, res) => {
    return res.status(200).json({
      animales: listAnimals,
    });
  });
  
  app.post(`${API_BASE_PATH}/animals`, (req, res) => {
    console.log("***BODY***", req.body);
  
    const newAnimal = {
      name: req.body.name,
      specie: req.body.specie,
    };
    listAnimals.push(newAnimal);
    return res.json({
      animal: newAnimal,
    });
  });

/*Frase*/
const initialPhrase = "Frase Inicial";

let phrase = initialPhrase.toLocaleLowerCase();

//http://localhost:5000/api/frase
app.get(`${API_BASE_PATH}/frase`, (req, res) => {
    return res.json({
      ok: true,
      message: `Frase Actual`,
      phrase: phrase,
    });
  });

app.listen(PORT, () => {
    console.log(`API RUNNING, PORT: ${PORT}`);
  });