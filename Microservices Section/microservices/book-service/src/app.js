const express = require("express");
const app = express();
const response = {
  data: [],
  services: "Book Serviche",
  architecture: "Microservices",
};

app.use((req, res, next) => 
{
  response.data = [];
  next();
});
const logger = (message) => 
{
  console.log(`[Book Service] ${message}`);
};
app.get("/api/v2/books", (req, res) => 
{
  response.data.push(
    "Cien años de soledad",
    "El amor en los tiempos del cólera",
    "La ciudad y los perror"
  );
  logger("Get book data");
  return res.send(response);
});

module.exports = app;
