const express = require("express");
const app = express();
const response = {
  data: [],
  services: "Monolithic Service",
  architecture: "Monolithic",
};

app.use((req, res, next) => 
{
  response.data = [];
  next();
});

app.get("/api/v1/users", (req, res) => 
{
  response.data.push("Renato", "Maite");
  return res.send(response);
});

app.get("/api/v1/books", (req, res) => 
{
    response.data.push(
        "The clean coder",
        "The pragmatic programmer",
        "Soft skills"
    );
    return res.send(response);
});

app.get("/api/v1/cars", (req, res)=>
{
    response.data.push(
        "Ferrari",
        "Tesla",
        "Jaguar"
    );
    return res.send(response);
});

module.exports = app;