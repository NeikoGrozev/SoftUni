const homeController = require('../controllers/homeController');
const authController = require('../controllers/authContorller');
const hotelController = require('../controllers/hotelController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotels', hotelController);
}