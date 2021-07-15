const models = require('../models');

module.exports = {
    joinsuccess: function (req, res) {
        res.render('user/joinsuccess');
    },
    join: function (req, res) {
        res.render('user/join');
    },
    _join: async function (req, res) {
        const result = await models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender
        });
        res.redirect('/user/joinsuccess');
    },
    login: function (req, res) {
        res.render('user/login');
    },
    _login: async function (req, res) {
        const user = await models.User.findOne({
            attributes: ['no', 'name', 'password', 'role'],
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (user == null) {
            res.render('user/login', Object.assign(req.body, {
                result: 'fail',
            }));
            return;
        }
        // 로그인 처리
        req.session.authUser = user;
        res.redirect('/');
    },
    logout: async function (req, res) {
        await req.session.destroy();
        res.redirect('/');
    },
    update: async function (req, res) {
        const user = await models.User.findOne({
            attributes: ['no', 'email', 'name', 'gender'],
            where: {
                no: req.session.authUser.no
            }
        })
        res.render('user/update', {
            user: user || ''
        });
    },
    _update: async function (req, res) {
        await models.User.update({
            name: req.body.name || req.session.authUser.name,
            password: req.body.password || req.session.authUser.password,
            gender: req.body.gender}, {
            where: {
                no: req.session.authUser.no
            }
        });
        res.redirect('/');
    }
}