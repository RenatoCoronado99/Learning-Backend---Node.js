const router = require('express').Router();
const {TechnologiesController} = require('../controllers');

router.get("/api/technologies", TechnologiesController.technologies);
router.get("/api/technology/:id", TechnologiesController.technologyById);
router.get("/api/technology/search/:name",TechnologiesController.searchTechnologies);

module.exports = router;