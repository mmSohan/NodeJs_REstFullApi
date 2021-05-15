require('express-async-errors');//version(2.1.0) for handeling async errors
const winston = require('winston') //version(2.4.0) logging what type of async errors it is
//require('winston-mongodb');//version(3.0.0)

module.exports = function(){
    //if any error or exception occour then it will
//help not to crush the application
//it's for syncronous procss
// process.on('uncaughtException', (ex)=>{
//     console.log('we got an uncaught exception');
//     winston.error(ex.message, ex);
// });

//for async exception
process.on('unhandledRejection', (ex)=>{
    console.log('we got an unhandeled rejection');
    winston.error(ex.message, ex);
    //if we want to handel this exception with
    //winston.handelException function then:
    //throw ex;
    //winston will autometically handel the async exception then we don't need 1st 2 lines
});

//instide of uncaughtException we can use it:
winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename: 'uncaughtException.log'}));

winston.add(winston.transports.File, {filename: 'logfile.log'});

// winston.add(winston.transports.MongoDB ,{
//     db: 'mongodb://localhosts/onlineMovies',
//     level: 'error'
// });
}