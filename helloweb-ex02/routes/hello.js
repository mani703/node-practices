const express = require('express');

const router = express.Router();

router.route("/01").get(function(req, res){ // http://localhost:8080/hello/01
    res.render('hello/01'); // hello/01.ejs
});

router.route("/02").get(function(req, res){ // http://localhost:8080/hello/02
    res.render('hello/02', { // hello/02.ejs
        no: req.query.no || "",       /*default*/
        email: req.query.email || ""  /*default*/
    });
});

module.exports = router;