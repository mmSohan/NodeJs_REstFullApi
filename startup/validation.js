const Joi = require('joi'); //version(13.0.1)
module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi);
}