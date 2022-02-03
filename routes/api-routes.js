const express = require('express')//express
const router = express.Router()//express router
const middleware = require('../middleware/middleware')

//router.use(middleware.countRequestesMiddleware)

//Zalando Routes
const zalando_controller = require('../controllers/zalando-controller')
router.route('/zalando').post(zalando_controller.findProduct)

//Zara Routes
const zara_controller = require('../controllers/zara-controller')
router.route('/zara').post(zara_controller.findProduct)

//Sephora Routes
const sephora_controller = require('../controllers/sephora-controller')
router.route('/sephora').post(sephora_controller.findProduct)

//Wallapop Routes
const wallapop_controller = require('../controllers/wallapop-controller')
router.route('/wallapop').post(wallapop_controller.findProduct)

//MediaMarkt Routes
const mediamarkt_controller = require('../controllers/mediamarkt-controller')
router.route('/mediamarkt').post(mediamarkt_controller.findProduct)

module.exports = router