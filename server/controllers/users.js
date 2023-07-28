var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // res.writeHead(200, headers);
        // res.end(JSON.stringify(results));
        res.json(results);
      }
    });
  },
  post: function (req, res) {
    var username = req.body.username;

    models.users.create(username, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // res.writeHead(201, headers);
        // res.end();
        res.json(results);
      }
    });
  }
};
