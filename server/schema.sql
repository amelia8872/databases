DROP DATABASE if exists chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL,
  name varchar(20),
  PRIMARY KEY (id)

);

CREATE TABLE rooms (
  id int NOT NULL,
  name varchar(20),
  PRIMARY KEY (id)

);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL,
  user_id int,
  room_id int,
  text varchar(500),

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)

);





/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

