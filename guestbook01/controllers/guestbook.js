const model = require('../models/guestbook')

module.exports = {
    index: async function(req, res){
        const results = await model.findAll();
        res.render('index', {
            list: results || []
        });
    },
    add: async function(req, res){
        const results = await model.insert(req.body);
        res.redirect("/");
    },
    form: function(req, res){
        res.render('deleteform', {
            no: req.params.no || 0
        });
    },
    delete: async function(req, res){
        const results = await model.delete(req.body);
        res.redirect("/");
    }
}