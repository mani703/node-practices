const { Sequelize } = require('sequelize');
const models = require('../models');
const moment = require('moment');

module.exports = {
    list: async function (req, res) {
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
        res.render('guestbook/list', {
            list: results || [],
            moment: moment
        });
    },
    add: async function(req, res){
        await models.Guestbook.create(req.body);
        res.redirect('/guestbook');
    },
    delete: function(req, res){
        res.render('guestbook/deleteform',{
            no: req.params.no || 0
        });
    },
    _delete: async function(req, res){
        await models.Guestbook.destroy({
            where: {
                no: req.body.no,
                password: req.body.password
            }
        });
        res.redirect('/guestbook');
    }
}