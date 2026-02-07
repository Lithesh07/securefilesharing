CREATE DATABASE secure_drive;
USE secure_drive;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  file_url TEXT,
  encrypted_password TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
