const express = require("express");
const cors = require("cors"); //Nos ayuda con los problemas de cors(dependencia d eproducción)
const helmet = require("helmet"); //Paquete que nos ayuda con brechas de seguridad.
const compression = require("compression"); //Nos ayuda a comprimir las peticiones HTTP para que sea más rápido
require("express-async-errors"); //Nos ayuda a capturar en un middleware las exepciones asíncronas de un middleware
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares'); //Middlewares de errores y status code.
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes }) 
{
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression());

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/idea", IdeaRoutes);
  apiRoutes.use("/comment", CommentRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  router.use("/v1/api", apiRoutes);
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  return router;
};
