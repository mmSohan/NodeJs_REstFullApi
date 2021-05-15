//const error = require('./middleware/error');
const winston = require('winston');
//const morgan = require('morgan');
const express = require('express');

//const Authentication = require("./Authentication")
const app = express();
app.use(express.json());
require('./startup/route')(app);
require('./startup/db')();
//require('./startup/loggingErrors')();
//require('./startup/loggingErrors')();
require('./startup/validation')();


//app.use(logger);
// app.use(function(req,res,next){
//     console.log("Authenticating...");
//     next();
// });

//app.use(express.urlencoded({extended: true}));//if we want to post data key=name value = comedy then we can use 
                                              //urllencoded middleware function
//app.use(express.static("public")) //css html files will be under public folder which passes by static middleware function


//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);
// if(app.get('env') === 'development'){
//   app.use(morgan('tiny'));
//   console.log("morgan enabled...");
// }

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;