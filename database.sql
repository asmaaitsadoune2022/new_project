CREATE DATABASE newapi_db;

CREATE TABLE employees(
id SERIAL PRIMARY KEY ,
firstName VARCHAR(255),
lastName VARCHAR(255),
emailId VARCHAR(255)
);