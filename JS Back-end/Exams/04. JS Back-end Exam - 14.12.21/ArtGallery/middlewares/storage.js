const publicationService = require('../services/publication');

module.exports = () => (req, res, next) => {

    req.storage = {
        ...publicationService
    };

    next();
}