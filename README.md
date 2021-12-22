# mysql-mongo-api

## Installation

```bash
$ git clone https://github.com/RuzgarAtaOzkan/mysql-mongo-api.git
$ cd mysql-mongo-api
$ npm install
$ npm run dev || npm run start
```

### Interact with SQL Server with the elegancy of MongoClient API

```javascript

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

```
