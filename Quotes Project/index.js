const express = require("express");
const server = express();
const config = require('./config');
const port = config.PORT;
server.use(express.static('./public'));
server.use(express.json());

const routes = require("./routes/routes");
const middlewares = require('./middlewares');
const router = require("./routes/home.routes.");
const notFoundMiddleware = middlewares.NotFoundMiddleware;

server.listen(port, ()=>
{
    console.log(`Server running on port ${port}`);
});

server.use('/', routes.HomeRoutes);
server.use('/', routes.QuotesRoutes);
server.use(notFoundMiddleware);

