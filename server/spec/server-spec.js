/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
    multipleStatements: true
  });

  beforeAll((done) => {
    dbConnection.connect();

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });


  // CREATE TABLE messages (
  //   /* Describe your table here.*/
  //   id int NOT NULL AUTO_INCREMENT,
  //   room_id int,
  //   user_id int,
  //   text varchar(200),
  //   PRIMARY KEY (id),
  //   FOREIGN KEY (user_id) REFERENCES users(id),
  //   FOREIGN KEY (room_id) REFERENCES rooms(id)


  // );
  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const message = 'Men like you can never change!';

    const queryString = `
      DELETE FROM rooms;
      DELETE FROM users;
      DELETE FROM messages;
      INSERT INTO messages (text, user_id, room_id) VALUES (?, ?, ?);
    `;
    const queryArgs = [message, 1, 1];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          console.log(messageLog);
          expect(messageLog[0].text).toEqual(message);
          expect(messageLog[0].room_id).toEqual(1);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
