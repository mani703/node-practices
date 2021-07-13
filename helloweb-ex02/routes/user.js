const express = require('express');

const router = express.Router();

router.route("").get(function(req, res){ // http://localhost:8080/user
    res.render('user/info', {   // user/info.ejs
        no: req.query.no || 0
    });
});

router.route("/info/:no").get(function(req, res){ // http://localhost:8080/user/info/10
    res.render('user/info', {   // user/info.ejs
        no: req.params.no || 0
    });
});

router.route("/join").get(function(req, res){ // http://localhost:8080/user/join
    res.render('user/join');    // user/join.ejs
});

router.route("/join").post(function(req, res){ // http://localhost:8080/user/join
    console.log(req.body);
    res.redirect("/");
});

router.route("/api").get(function(req, res){ // http://localhost:8080/user/api
    const vo = {
        no: 10,
        name: '둘리',
        email: 'dooly@gmail.com',
        gender: 'male'
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(vo));
});

module.exports = router;