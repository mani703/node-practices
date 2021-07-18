const models = require('../models');
const {Sequelize} = require('sequelize');

module.exports = {
    create: async function(req, res, next){
        // sql insert
        try {
            const result = await models.Guestbook.create(req.body);
            res.status(200).send({
                result: 'success',
                data: result.dataValues,
                message: null
            });
        } catch (err) {
            next(err);
        }
    },
    read: async function(req, res, next){
        const startNo = req.query.sno
        //sql select....limit
        try {
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message', [Sequelize.fn("date_format", Sequelize.col("reg_date"), "%Y/%m/%d %H:%i:%s"), "regDate"]],
                order: [
                    ['no', 'desc']
                ],
                offset: parseInt(startNo),
                limit: 3
            })
            res.status(200).send({
                result: 'success',
                data: results,
                message: null
            });
        } catch (err) {
            next(err)
        }
    },
    delete: async function(req, res, next){
        // sql delete
        try {
            await models.Guestbook.destroy({
                where:{
                    no: req.params.no,
                    password: req.body.password
                }
            });
            res.status(200).send({
                result: 'success',
                data: req.params.no,
                message: null
            });   
        } catch (err) {
            next(err);
        }
    }
}