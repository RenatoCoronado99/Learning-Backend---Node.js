const express = require('express');
module.exports = function({ StationsRoutes })
{
    const router = express.Router();
    router.use('', StationsRoutes);
    return router;
};