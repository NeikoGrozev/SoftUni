const homeController = require('../controllers/homeController');
const authController = require('../controllers/authContorller');
const houseContorller = require('../controllers/houseController');
const { notFound } = require('../controllers/notFoundController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/house/', houseContorller);

    app.all('*', notFound);
}