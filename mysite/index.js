const express = require('express');
const session = require('express-session');
const http = require('http');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv')

// Environment Variables(환경변수)
dotenv.config({path: path.join(__dirname, 'config/app.env')});
dotenv.config({path: path.join(__dirname, 'config/db.env')});

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const guestbookRouter = require('./routes/guestbook');
const galleryRouter = require('./routes/gallery');
const boardRouter = require('./routes/board');

const userApiRouter = require('./routes/user-api');
const guestbookApiRouter = require('./routes/guestbook-api');

const errorRouter = require('./routes/error');

//Logging
const logger = require('./logging');

// Application Setup
const application = express()
    // 1. session environment
    .use(session({
        secret: 'mysite-session',   // 쿠키 변조를 방지하기 위한 값
        resave: false,              // 요청 처리에서 세션의 변경사항 없어도 항상 저장
        saveUninitailized: false    // 새로 세션을 생성할 때 "uninitialized" 상태로 둔다. 따라서 로그인 세션에서는 false로 둔다.
    }))
    // 2. request body parser
    .use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded
    .use(express.json())                       // application/json
    // 3. multipart
    .use(multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE)
    }).single('file')) // <input type="file" id="input-file" name="file"> name 이름이랑 같아야 한다.
    // 4. static serve 
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    // 5. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 6. request router
    .all('*', function(req, res, next) {
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use('/', mainRouter)
    .use('/user', userRouter)
    .use('/guestbook', guestbookRouter)
    .use('/gallery', galleryRouter)
    .use('/board', boardRouter)

    .use('/api/user', userApiRouter)
    .use('/api/guestbook', guestbookApiRouter)
    .use(errorRouter.error404) // 404 error
    .use(errorRouter.error500) // 500 error

// Server Setup    
http.createServer(application)
    .on('listening', function(){
        logger.info(`Http Server running on port ${process.env.PORT}`);
    })
    .on('error', function(error){
        if(error.syscall !== 'listen'){
            throw error;
        }
        switch(error.code){
            case 'EACCESS':
                logger.error(`Port:${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`Port:${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(process.env.PORT);