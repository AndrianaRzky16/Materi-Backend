const express = require("express");
const app = express();
const port = 3000;

//routes / URL / utama kita method GET

app.get("/", (request, response) => {
  response.send("Utama!");
});

app.get("/hello", (req, res) => {
  res.send("Hello World LALA!");
});

app.post("/login", (req, res) => {
  if (req.name === "Rizki") {
    res.send("Login Success!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
