/**
 * Iniciar un proyecto Node.js: npm init
 * Instalar express: npm install express
 * npm install: instalar todas las dependencias necesarias dle proyecto.
 **/

/*const http = require('http');

//Esquema request-response: el request es lo que solicita el cliente y response lo que responde el servidor.
http.createServer((request, response)=>
{
    response.write("Hello world form Node.js");
    response.end();
}).listen(8080);*/

const express = require('express');
const server = express();

const fs = require("fs");

const html = fs.readFileSync("./index.html");
const home = fs.readFileSync("./home.html");
const about = fs.readFileSync("./about.html");

server.listen(8080, ()=>
{
    console.log("Server is running on port "+8080);
});

//Rutas con Express
server.get('/', (request, response) =>
{
    showPage(response, home);
});

server.get('/about', (req, res) =>
{
    showPage(res, about);
});


function showPage(response, html)
{
    response.write(html);
}