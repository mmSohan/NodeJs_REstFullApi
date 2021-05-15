const { Rental } = require('../models/rental.model');
const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require('../models/user.model');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = ()=>{
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({customerId, movieId});
    }

    beforeEach(async () => {
        server = require('../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        token = new User().generateAuthToken();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: 'sohan',
                phone: '01721'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();
    })
    afterEach(async () => {
        await server.close();
        await Rental.remove({});
    });

    it('should return 401 if client is not logged in',async () => {
       
    
    expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided',async () => {
        const token = new User().generateAuthToken();
        
        
    
    expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided',async () => {
        const token = new User().generateAuthToken();
        
        const res =await request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({ customerId});
    
    expect(res.status).toBe(400);
    });
});