const winston = require('winston')
 const mongoose = require('mongoose');
 const config = require('config');
module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => winston.info(`coneected to ${db}...`));
    //.catch(err => console.error('Could not connect to MongoDb', err))
}

