DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;


/* Create a table for all your star wars characters */
CREATE TABLE burgers (
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR( 255 ) NOT NULL,
    devoured BOOLEAN default false,
	PRIMARY KEY ( id )
);

SELECT * FROM burgers;