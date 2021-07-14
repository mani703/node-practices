const { Sequelize } = require('sequelize');
const models = require('../models');

module.exports = {
    list: async function (req, res) {
        const results = await models.Guestbook.findAll({
            attributes: [
                'no', 
                'name', 
                'message', 
                [Sequelize.fn("date_format", Sequelize.col("reg_date"), "%Y-%m-%d %h:%m"), "regDate"]
            ],
            order: [
                ['regDate', 'DESC']
            ]
        })
        res.render('guestbook/list', {
            list: results || []
        });
    },
    _list: async function(req, res){
        console.log(req.body);
        const result = await models.Guestbook.create({
            name: req.body.name,
            password: req.body.password,
            message: req.body.message,
        });
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