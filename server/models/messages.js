var db = require('../db');
// access the database, and modify the database
//The .query() method is part of the MySQL2 library for Node.js.


module.exports = {

  // a function which produces all the messages
  //'SELECT * FROM messages INNER JOIN users on (messages.user_id = users.id) INNER JOIN rooms on (messages.room_id = rooms.id)'
  getAll: function (callback) {
    db.query('SELECT * FROM messages', (err, results)=> {

      if (err) {

        callback(err);
        // throw err;
      } else {
        callback(null, results);
      }
    });
  },

  create: function (username, roomname, message, callback) {
    //  console.log('We are create message!');
    const query = 'INSERT INTO messages (text, user_id, room_id) VALUES (?, (SELECT id FROM users WHERE user_name = ?), (SELECT id from rooms WHERE room_name = ?))';

    db.query(query, [message, username, roomname], (err, results) => {
      // console.log(message);
      //console.log(username);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }


};














