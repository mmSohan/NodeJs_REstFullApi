const express = require('express');
const movies = require('../routes/movie');
const rentals = require('../routes/rental')
const users = require('../routes/users');
const auth = require('../routes/auth');
//const logger = require("../middleware/logger")
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const error = require('../middleware/error');
const returns = require('../routes/returns');
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);

    //handeling error from routes

    app.use(error);
}