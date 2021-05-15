module.exports = function(handler){
    return async(req,res,next)=>{
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    };
}

//If express-async-errors nmp not work then we can use
//this middleware function in every route handeler
//to handel errors.