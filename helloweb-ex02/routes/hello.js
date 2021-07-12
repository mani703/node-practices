  const express = require('express');

const router = express.Router();
router.route("/01").get(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('hello01');   
});

module.exports = router;