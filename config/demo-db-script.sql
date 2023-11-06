DROP DATABASE civil;

CREATE DATABASE civil;

use civil;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(64) NOT NULL,
name VARCHAR(64) NOT NULL,
phone VARCHAR(20) NOT NULL,
first_login bool DEFAULT false,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Credits table
CREATE TABLE IF NOT EXISTS credits (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
credit_count INT DEFAULT 0,
credit_type VARCHAR(64) DEFAULT 'month',
credited_on datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Client table
CREATE TABLE IF NOT EXISTS clients (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id INT,
name VARCHAR(64) NOT NULL,
email VARCHAR(65) NOT NULL,
phone VARCHAR(20) NOT NULL,
address VARCHAR(255) NOT NULL,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project table
CREATE TABLE IF NOT EXISTS projects (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
client_id INT NOT NULL,
name VARCHAR(64) NOT NULL,
description VARCHAR(255) NOT NULL,
status VARCHAR(64) DEFAULT 'Pitched',
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Room table
CREATE TABLE IF NOT EXISTS rooms (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id INT,
project_id INT NOT NULL,
length INT NOT NULL,
width INT NOT NULL,
height INT NOT NULL,
price INT NOT NULL DEFAULT 0,
discount INT NOT NULL DEFAULT 0,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


