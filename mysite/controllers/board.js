const models = require('../models')
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = {
    index: async function(req, res, next){
        try {
            console.log(req.params.page);
            const count = await models.Board.count();
            const pageSize = 5;
            const currentPage = parseInt(req.params.page) || 1;
            const lastPage = Math.ceil(count/pageSize);
            const blockNum = Math.floor((currentPage-1) / pageSize);
            const blockStart = (pageSize * blockNum) + 1;
            const blockLast = blockStart + (pageSize - 1);

            const pager = { count, pageSize, currentPage, lastPage, blockNum, blockStart, blockLast}
    
            const results = await models.Board.findAll({
                include: {
                    model: models.User,
                    attributes: ['no', 'name'],
                    required: true,
                },
                order: [
                    ['groupNo', 'desc'],
                    ['orderNo', 'asc']
                ],
                limit: pager.pageSize,
                offset: (pager.currentPage-1) * pager.pageSize
            });

            res.render('board/index', {
                list: results || [],
                moment: moment,
                pager: pager
            });

        } catch (err) {
            next(err);
        }
    },
    add: function(req, res, next){
        try {
            console.log(req.params.no);
            res.render('board/write',{
                no: req.params.no
            });
        } catch (err) {
            next(err);
        }
    },
    _add: async function(req, res, next){
        try {
            console.log(req.params.no);
            const groupNo = await models.Board.max('groupNo');

            const result = await models.Board.create({
                title: req.body.title || '',
                contents: req.body.contents || '',
                hit: 0,
                groupNo: groupNo + 1 || 1,
                orderNo: 0,
                depth: 0,
                userNo: req.params.no
            })
            res.redirect('/board');
        } catch (err) {
            next(err);
        }
    },
    view: async function(req, res, next){
        try {
            const result = await models.Board.findOne({
                where: {
                    no: req.params.no
                }
            });
            
            await models.Board.update({
                hit: result.hit+1 }, {
                where: {
                    no: req.params.no
                }
            });

            res.render('board/view', {
                board: result
            });
        } catch (err) {
            next(err);
        }
    },
    modify: async function(req, res, next){
        try {
            result = await models.Board.findOne({
                where: {
                    no: req.params.no
                }
            })
            res.render('board/modify', {
                board: result
            });
        } catch (err) {
            next(err);
        }
    },
    _modify: async function(req, res, next){
        try {
            await models.Board.update({
                title: req.body.title || '',
                contents: req.body.contents || ''}, {
                where: {
                    no: req.params.no
                }
            });
            res.redirect('/board');
        } catch (err) {
            next(err);
        }
    },
    reply: async function(req, res, next){
        try {
            result = await models.Board.findOne({
                where: {
                    no: req.params.no
                }
            })
            res.render('board/reply', {
                board: result
            });
        } catch (err) {
            next(err);
        }
    },
    _reply: async function(req, res, next){
        try {
            const vo = await models.Board.findOne({
                where: {
                    no: req.params.no
                }
            });
            const result = await models.Board.create({
                orderNo: vo.orderNo + 1,
                depth: vo.depth + 1,
                groupNo: vo.groupNo,
                userNo: req.session.authUser.no,
                title: req.body.title,
                contents: req.body.contents,
                hit: 0
            })
            res.redirect('/board');
        } catch (err) {
            next(err);
        }
    },
    delete: async function(req, res, next){
        try {
            const result = await models.Board.findOne({
                where: {
                    no: req.params.no
                }
            });
            await models.Board.destroy({
                where: {
                    no: req.params.no 
                }
            });
            res.redirect('/board/' + req.params.page);
        } catch (err) {
            next(err);
        }
    }
}