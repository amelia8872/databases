var models = require('../models');


// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10,
//   'Content-Type': 'application/json'
// };


module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // res.writeHead(200, headers);
        // res.end(JSON.stringify(results));
        res.json(results);
      }
    });
  }, // a function which handles a get request for all messages


  post: function (req, res) {
    // username, roomname, message

    var username = req.body.username;
    var roomname = req.body.roomname;
    var message = req.body.message;



    models.messages.create(username, roomname, message, (err, results) => {
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
// a function which handles posting a message to the database}
