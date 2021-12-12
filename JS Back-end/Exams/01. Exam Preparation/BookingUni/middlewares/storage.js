const hotelService = require('../services/hotel');

module.exports = () => (req, res, next) => {

    req.storage = {
        ...hotelService
    };

    next();
}