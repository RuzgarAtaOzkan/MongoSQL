'use strict';

// MODULES
const mysql = require('mysql');

// LIBRARY
const configClient = require('./lib/configClient');

const client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app',
});

client.connect((err) => {
  if (err) {
    throw console.log(err);
  }

  console.log('connected');
});

const db = configClient(client);

const createTableResult = db.createTable('users', {
  properties: {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    address: 'VARCHAR(255)',
    name: 'VARCHAR(255)',
  },
});

const editTableResult = db.editTable('users', {
  column: {
    type: 'ADD',
    properties: {
      id: 'INT AUTO_INCREMENT PRIMARY KEY',
    },
  },
});

const user = {
  address: 'Sahiltepe',
  name: 'Ruzgar',
};

const insertOneResult = db.insertOne('users', user);
