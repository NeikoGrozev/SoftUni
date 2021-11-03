let { deleteItem } = require('../database');

module.exports = (req, res) => {
    var id = req.url.split('=')[1];
    deleteItem(id);

    res.writeHead(301, { 'Location': '/catalog' });
    res.end();
}