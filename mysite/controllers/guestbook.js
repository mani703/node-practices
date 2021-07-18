const models = require('../models');
const moment = require('moment');

module.exports = {
    index: async function (req, res, next) {
        try {
            const results = await models.Guestbook.findAll({
                attributes: [
                    'no', 
                    'name', 
                    'message', 
                    'regDate'
                ],
                order: [
                    ['regDate', 'DESC']
                ]
            })
            res.render('guestbook/index', {
                list: results || [],
                moment: moment
            });
        } catch (e) {
            next(e);
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
    delete: function(req, res){
        res.render('guestbook/deleteform',{
            no: req.params.no || 0
        });
    },
    _delete: async function(req, res, next){
        try {
            await models.Guestbook.destroy({
                where: {
                    no: req.body.no,
                    password: req.body.password
                }
            });
            res.redirect('/guestbook');
        } catch (e) {
            next(e);
        }
    },
    spaLanding: function(req, res, next){
        res.render('guestbook/spa-landing');
    }
}