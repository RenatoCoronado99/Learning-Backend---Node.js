const express = require("express");
const server = express();
const cors = require("cors");
const { Technology } = require("../models");
const { TechnologiesRoutes } = require('../routes');
const {NotFoundMiddleware} = require('../middlewares');

server.use(express.json());
server.use(express.static(__dirname + "/../public"));
server.use(cors());
server.use('/', TechnologiesRoutes);
server.use(NotFoundMiddleware);
module.exports = server;
/*server.get("/api/technologies", async (req, res, next) => {
  let technologies = await Technology.find();
  technologies = technologies.map((technology) => {
    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return technology;
  });
  return res.send({ error: false, data: technologies });
});

server.get("/api/technology/:id", async (req, res, next) => {
  const { id } = req.params;
  let tech = await Technology.findById(id);
  tech.logo = `${req.protocol}://${req.headers.host}/img/${tech.logo}`;
  return res.send({ error: false, data: tech });
});

server.get("/api/technology/search/:name", async (req, res, next) => {
  const { name } = req.params;
  let technologies = await Technology.find(
      {
    name: { $regex: new RegExp(name, "i") },
  });
  technologies = technologies.map((technology) => {
    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return technology;
  });
  return res.send({ error: false, data: technologies });
});*/

