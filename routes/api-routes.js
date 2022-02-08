const express = require('express')//express
const 
router = express.Router()//express router
const middleware = require('../middleware/middleware')//middlewares

// router.use(middleware.countRequestesMiddleware)

//Sephora Routes
const sephora_controller = require('../controllers/sephora-controller')
router.route('/sephora').post(middleware.isAllowedNav, sephora_controller.findProduct)

//Zalando Routes
/*const zalando_controller = require('../controllers/zalando-controller')
router.route('/zalando').post(zalando_controller.findProduct)*/

//Zara Routes
/*const zara_controller = require('../controllers/zara-controller')
router.route('/zara').post(zara_controller.findProduct)*/


//Wallapop Routes
/*const wallapop_controller = require('../controllers/wallapop-controller')
router.route('/wallapop').post(wallapop_controller.findProduct)*/

//MediaMarkt Routes (DEV)
/*const mediamarkt_controller = require('../controllers/mediamarkt-controller')
router.route('/mediamarkt').post(mediamarkt_controller.findProduct)*/

//Apple Routes
/* const apple_controller = require('../controllers/apple-controller')
router.route('/apple').post(apple_controller.findProduct)*/

//Lidl Routes
/*const lidl_controller = require('../controllers/lidl-controller')
router.route('/lidl').post(lidl_controller.findProduct)*/

//Ikea Routes
/*const ikea_controller = require('../controllers/ikea-controller')
router.route('/ikea').post(ikea_controller.findProduct)*/

//Gucci Routes
/*const gucci_controller = require('../controllers/gucci-controller')
router.route('/gucci').post(gucci_controller.findProduct)*/

//Wildcard Routes
const wildcard_controller = require('../controllers/wildcard-controller')
router.route('/:shop').post(wildcard_controller.findProduct)
module.exports = router//module exports