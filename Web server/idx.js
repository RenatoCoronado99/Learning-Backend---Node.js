const http = require("http");
const fs = require("fs");

const html = fs.readFileSync("./index.html");
const home = fs.readFileSync("./home.html");
const about = fs.readFileSync("./about.html");

//Esquema request-response: el request es lo que solicita el cliente y response lo que responde el servidor.
http
  .createServer((request, response) => {
    const url = request.url;
    switch (url) {
      case "/":
        showPage(response, 200, html);
        break;
      case "/about":
        showPage(response, 200, about);
        break;
      case "/home":
        showPage(response, 200, home);
        break;
      default:
        showPage(response, 404, "Page not found!");
        break;
    }

    response.end();
  })
  .listen(8080);

function showPage(response, code, html) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(html);
}
