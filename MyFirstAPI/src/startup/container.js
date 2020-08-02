//Configuraremos el contenedorde inyección de dependencias
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require("../config");
const app = require(".");

//Services
const { HomeService } = require("../services");

//Controllers
const { HomeController } = require("../controllers");

//Routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

//Models
const { User, Idea, Comment } = require("../models");

const container = createContainer();

//con register, realizamos cualquier tipo de inyección de dependencias
container
  //Regisrar configración de la aplicación
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  //Registrar servicios
  .register({
    HomeService: asClass(HomeService).singleton(),
  })
  //Registrar controllers
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  //Registrar rutas
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  //Registrar modelos
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  });

module.exports = container;
