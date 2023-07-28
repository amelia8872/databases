var mysql = require('mysql2');

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

// Create a single connection
const connection = mysql.createConnection({
  // host: 'localhost', // Change this to your MySQL host if it's different
  user: 'root',      // Your MySQL username
  password: '',      // Your MySQL password (if you have one)
  database: 'chat'   // The name of the database you created in the SQL script
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Export the connection to be used in other parts of your application
module.exports = connection;