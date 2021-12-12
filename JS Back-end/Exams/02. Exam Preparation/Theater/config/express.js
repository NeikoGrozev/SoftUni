const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const authMiddleware = require('../middlewares/auth');
const storageMiddleware = require('../middlewares/storage');

module.exports = (app) => {

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());
    app.use(storageMiddleware());
}