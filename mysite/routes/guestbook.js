const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/guestbook');

const router = express.Router();

router.route('/').get(controller.list);
router.route('/').post(controller._list);
router.route('/delete/:no').get(auth, controller.delete);
router.route('/delete').post(controller._delete);

module.exports = router;