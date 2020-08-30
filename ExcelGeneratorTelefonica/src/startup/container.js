const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require("../config");
const app = require(".");

//Controllers
const { StationsController} = require('../controllers');

//Router
const { StationsRoutes } = require('../routes/index.routes');
const Routes = require("../routes");

//Repositories
const { StationsRepository } = require('../repositories');

const container = createContainer();
container.register({
  app: asClass(app).singleton(),
  router: asFunction(Routes).singleton(),
  config: asValue(config),
}).register({
  StationsController: asClass(StationsController.bind(StationsController)).singleton()
}).register({
  StationsRoutes: asFunction(StationsRoutes).singleton()
}).register({
  StationsRepository: asClass(StationsRepository).singleton()
});

module.exports = container;
