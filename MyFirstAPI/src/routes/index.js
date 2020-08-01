const express = require("express");
const cors = require("cors"); //Nos ayuda con los problemas de cors(dependencia d eproducción)
const helmet = require("helmet"); //Paquete que nos ayuda con brechas de seguridad.
const compression = require("compression"); //Nos ayuda a comprimir las peticiones HTTP para que sea más rápido
require("express-async-errors"); //Nos ayuda a capturar en un middleware las exepciones asíncronas de un middleware
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares'); //Middlewares de errores y status code.

module.exports = function ({ HomeRoutes }) 
{
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression());

  apiRoutes.use("/home", HomeRoutes);
  router.use("/v1/api", apiRoutes);
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  return router;
};
