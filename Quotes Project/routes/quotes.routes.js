const router = require("express").Router();
const controllers = require('../controllers/controllers');
const quotesController = controllers.QuotesController;

router.get("/quotes", quotesController.quotes);
router.get('/quotes/all', quotesController.get);
router.post('/quotes', quotesController.add);
module.exports = router;