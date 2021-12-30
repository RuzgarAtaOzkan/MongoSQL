# mysql-mongo-api

## Installation

Assuming you have nodejs and git installed.

```bash
$ git clone https://github.com/RuzgarAtaOzkan/mysql-mongo-api.git
$ cd mysql-mongo-api
$ npm install
$ npm run dev || npm run start
```

### Interact with SQL Server with the elegancy of MongoClient API

1. Create your sql client

```javascript
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
```

Then create the db object API just like the MongoClient API by passing the sql client.

```javascript
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

const insertOneResult = db.insertInto('users', user);
```
