const express = require('express');

const router = express.Router();
router.route("").get(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('main');   
});

module.exports = router;