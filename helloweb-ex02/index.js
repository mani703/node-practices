const http = require('http');
const path = require('path');
const express = require('express');

const mainRouter = require('./routes/main');
const helloRouter = require('./routes/hello');
const port = 8080;

// Application Setup
const application = express()
    // 1. static serve 
    .use(express.static(path.join(__dirname, "public")))
    // 2. view engine setup
    // 3. request router
    .all('*', function(req, res, next){
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use('/', mainRouter)
    .use('/hello', helloRouter);


// Server Setup    
http.createServer(application)
    .on('listening', function(){
        console.info(`Http Server running on port ${port}`);
    })
    .on('error', function(error){
        if(error.syscall !== 'listen'){
            throw error;
        }
        switch(error.code){
            case 'EACCESS':
                console.error(`Port:${port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port:${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(port);