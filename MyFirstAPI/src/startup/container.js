//Configuraremos el contenedorde inyección de dependencias
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require("../config");
const app = require(".");

//Services
const {
  HomeService,
  UserService,
  IdeaService,
  CommentService,
  AuthService,
} = require("../services");

//Controllers
const {
  HomeController,
  UserController,
  IdeaController,
  CommentController,
  AuthController,
} = require("../controllers");

//Routes
const {
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes,
} = require("../routes/index.routes");
const Routes = require("../routes");

//Models
const { User, Idea, Comment } = require("../models");

//Repositories
const {
  UserRepository,
  IdeaRepository,
  CommentRepository,
} = require("../repositories");

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
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  //Registrar controllers
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
  })
  //Registrar rutas
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  })
  //Registrar modelos
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
  })
  //Registrar Repositorios
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
