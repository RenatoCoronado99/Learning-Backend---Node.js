const { Router } = require('express');
module.exports = function({ StationsController })
{
    const router = Router();
    router.get("/", StationsController.index);
    return router;
};