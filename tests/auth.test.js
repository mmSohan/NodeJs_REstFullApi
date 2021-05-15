const {User} = require('../models/user.model');
const request = require('supertest'); //version(3.0.0)
const { Genre } = require('../models/genre.model');

describe('auth middleware', ()=>{
    beforeEach(() => { server = require('../index'); })
    afterEach(async () => {
        await Genre.remove({});
        await server.close();
        
    });

    let token;
    let name;

    const exec = async ()=>{
        return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({name: name});
    }

    beforeEach(()=>{
        token = new User().generateAuthToken();
        name = 'genre1';
    });

    it('should return 401 if no token is provided',async () =>{
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if no token is invalid',async () =>{
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid',async () =>{

        const res = await exec();

        expect(res.status).toBe(200);
    });


});