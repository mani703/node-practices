const express = require('express');
const controller = require('../controllers/board')
const auth = require('./auth')

const router = express.Router();

router.route('/write/:no').get(auth(), controller.add);
router.route('/write/:no').post(auth(), controller._add);
router.route(['', '/:page']).get(controller.index);
router.route('/view/:no').get(controller.view);
router.route('/modify/:no').get(controller.modify);
router.route('/modify/:no').post(controller._modify);
router.route('/reply/:no').get(controller.reply);
router.route('/reply/:no').post(controller._reply);
router.route('/delete/:page/:no').get(controller.delete);

module.exports = router;