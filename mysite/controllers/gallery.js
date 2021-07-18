const fs = require('fs');
const path = require('path');
const { gzip } = require('zlib');
const models = require('../models');

module.exports = {
    index: async function (req, res, next) {
        try {
            const results = await models.Gallery.findAll({
                atrributes: ['no', 'url', 'comment'],
                order:[
                    ['no', 'desc']
                ]
            });
            res.render('gallery/index', {
                galleries: results
            });
        } catch (err) {
            next(err);
        }
    },
    upload: async function(req, res, next){
        try {
            const file = req.file;
            console.log("upload temp: " + file.path);

            const storeDirectory = path.join(path.dirname(require.main.filename),
                process.env.STATIC_RESOURCES_DIRECTORY, 
                process.env.GALLRY_STORE_LOCATION);
            console.log("storeDirectory: " + storeDirectory);

            const url = path.join(
                process.env.GALLRY_STORE_LOCATION,
                file.filename
            ) + path.extname(file.originalname);
            console.log("url: " + url)

            const storePath = path.join(
                storeDirectory,
                file.filename
            ) + path.extname(file.originalname);
            console.log("storePath: " + storePath);

            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory); // false 면 디렉토리 생성
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: 'w+'});

            await models.Gallery.create({
                url: url.replace(/\\/gi, '/'),
                comment: req.body.comment || ''

            });

            res.redirect('/gallery');
        } catch (err) {
            next(err);
        }
    },
    delete: async function(req, res, next){
        try {
            await models.Gallery.destroy({
                where: {
                    no: req.params.no
                }
            });
            res.redirect("/gallery");
        } catch (err) {
            next(err);
        }
    }
}