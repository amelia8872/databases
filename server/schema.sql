DROP DATABASE if exists chat;
CREATE DATABASE chat;

USE chat;


CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  room_id int,
  user_id int,
  text varchar(200),
  PRIMARY KEY (id)
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  -- FOREIGN KEY (room_id) REFERENCES rooms(id)

);

CREATE TABLE users (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(20),
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  room_name varchar(20),
  PRIMARY KEY(id)
);


/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
      mysql -u root
      mysql> use chat;

      *  to create the database and the tables.*/


