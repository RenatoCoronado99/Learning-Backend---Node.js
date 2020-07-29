const router = require("express").Router();
const controller = require('../controllers/controllers');
const homeController = controller.HomeController;

router.get('/', homeController.index);
router.get('/about', homeController.about);
module.exports = router;