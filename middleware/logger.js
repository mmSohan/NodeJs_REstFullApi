function log(res,res,next){
   console.log("Logging...") 
   next();
}
module.exports = log;