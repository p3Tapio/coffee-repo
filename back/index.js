const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

let coffeeSource = "./coffees.json";

if (process.env.NODE_ENV === "test") {
  coffeeSource = "./coffeesTest.json";
}

const getCoffees = () => {
  const data = fs.readFileSync(coffeeSource);
  return JSON.parse(data);
};

app.get("/api/coffees", (req, res) => {
  try {
    const coffees = getCoffees();
    res.status(200).send(coffees);
  } catch {
    res.status(500).send({ error: "woops, something went wrong" });
  }
});

app.post("/api/coffees", (req, res) => {
  try {
    if (Object.keys(req.body).length !== 4) {
      return res.status(400).send({ error: "Wrong kind of coffee" });
    }
    let coffees = getCoffees();
    const newCoffee = { ...req.body, id: uuidv4() };
    coffees = coffees.concat(newCoffee);
    fs.writeFileSync(coffeeSource, JSON.stringify(coffees));

    res.status(200).send(coffees);
  } catch (e) {
    res.status(500).send({ error: "woops, something went wrong" });
  }
});

const unknownRoute = (request, res) => {
  res.status(404).send({ error: "unknown enpoint" });
};

app.use(unknownRoute);

const port = 3001;
app.listen(port, () => {
  console.log(`Server port ${port}, using "${coffeeSource}" as coffee source.`);
});

module.exports = app;
