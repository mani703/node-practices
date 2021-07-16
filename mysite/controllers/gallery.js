const models = require('../models');

module.exports = {
    index: async function (req, res, next) {
        try {
            res.render('gallery/index', {    
            });
        } catch (err) {
            next(err);
        }
    },
    add: async function(req, res, next){
        try {
            await models.Guestbook.create(req.body);
            res.redirect('/guestbook');
        } catch (e) {
            next(e);
        }
    },
   
}