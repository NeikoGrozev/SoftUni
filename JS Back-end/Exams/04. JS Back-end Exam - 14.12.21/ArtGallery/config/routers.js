const homeController = require('../controllers/homeController');
const authController = require('../controllers/authContorller');
const publicationController = require('../controllers/publicationController');
const { notFound } = require('../controllers/notFoundController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/publication', publicationController);

    app.all('*', notFound);
}