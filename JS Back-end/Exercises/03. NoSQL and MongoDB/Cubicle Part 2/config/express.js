const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.engine('hbs', hbs({
        extname: '.hbs',
    }));

    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    
    
    //TODO: Setup the view engine

    //TODO: Setup the body parser

    //TODO: Setup the static files

};