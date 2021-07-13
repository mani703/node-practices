const express = require('express');

const router = express.Router();

router.route("").get(function(req, res){ // http://localhost:8080
    res.render('main/index'); // main/index.ejs
});

module.exports = router;