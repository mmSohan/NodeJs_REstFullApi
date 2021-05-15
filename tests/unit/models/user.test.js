const {User} = require('../../../models/user.model');
const jwt =require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
describe('user.generateAuthToken', ()=>{
    it('should return valid JWT',()=>{
        const payload = {
            _id: mongoose.Types.ObjectId().toHexString() ,
             isAdmin: true 
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decode).toMatchObject(payload);


    });
});