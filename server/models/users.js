var db = require('../db');

module.exports = {
  getAll: function (callback) {

    var queryString = 'SELECT * FROM users';
    db.query(queryString, (err, results)=> {
      if (err) {
        throw err;
        //callback(err);  //same
      } else {
        callback(null, results);
      }
    });

  },



  create: function (username, callback) {
    console.log(username);

    var queryString = 'INSERT IGNORE INTO users (user_name) VALUES (?)';
    db.query(queryString, [username], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.stringify(result));
      }
    });
  }
};



/*

create: function (username, callback) {
  db.query(`INSERT INTO users (username) VALUES(${username})`, (err, result)=> {
    if (err) {
      callback(err);
    } else {
      callback(null, 'db: message received');
    }
  });
}
};
*/