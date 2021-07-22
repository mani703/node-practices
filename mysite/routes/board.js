const express = require('express');
const controller = require('../controllers/board')
const authorized = require('./auth')

const router = express.Router();

router.route('/write/:no').get(authorized(), controller.add);
router.route('/write/:no').post(authorized(), controller._add);
router.route(['', '/:page']).get(controller.index);
router.route('/view/:no').get(controller.view);
router.route('/modify/:no').get(controller.modify);
router.route('/modify/:no').post(controller._modify);
router.route('/reply/:no').get(controller.reply);
router.route('/reply/:no').post(controller._reply);
router.route('/delete/:page/:no').get(controller.delete);

module.exports = router;