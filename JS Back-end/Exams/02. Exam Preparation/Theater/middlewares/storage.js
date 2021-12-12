const playService = require('../services/play');

module.exports = () => (req, res, next) => {

    //TODO import ...
    req.storage = {
        ...playService
    };

    next();
}