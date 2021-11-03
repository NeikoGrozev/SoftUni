let { peoples, addItem } = require('../database');

const formidable = require('formidable');

module.exports = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
    }

    addItem(`${fields.name}: ${fields.age}`);

    res.writeHead(301, { 'Location': '/catalog' });
    res.end();
  });
}