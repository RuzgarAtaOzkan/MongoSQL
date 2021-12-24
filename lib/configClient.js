const validateProps = require('./validateProps');

function configClient(client) {
  if (!client) {
    throw new Error('Too few arguments specified in configClient');
  }

  const types = {
    INT: 'INT',
    VARCHAR255: 'VARCHAR(255)',
  };

  const commands = {
    CREATE: 'CREATE',
    TABLE: 'TABLE',
    INSERT: 'INSERT',
    INTO: 'INTO',
  };

  const db = {
    createDb: function (name) {
      if (!name) {
        throw new Error('Too few arguments specified in db.createDb');
      }

      if (typeof name !== 'string') {
        throw new Error('Invalid typeof parameter specified in db.createDb');
      }

      const sql = `CREATE DATABASE ${name}`;

      const result = client.query(sql, (err, result) => {
        if (err) {
          return console.log(err.message);
        }
      });

      return result;
    },

    createTable: function (name, options) {
      if (!name || !options) {
        throw new Error('Too few arguments specified in db.createTable');
      }

      if (typeof name !== 'string') {
        throw new Error('Invalid typeof parameter specified in db.createTable');
      }

      const { properties } = options;

      if (!properties) {
        throw new Error('Missing properties of options in db.createTable');
      }

      validateProps(properties);

      const keys = [];
      for (const key in options.properties) {
        keys.push(`${key} ${options.properties[key]}`);
      }

      const sql = `CREATE TABLE ${name} (${keys.join(', ')})`;

      const result = client.query(sql, (err, result) => {
        if (err) {
          return console.log(err.message);
        }
      });

      return result;
    },

    editTable: function (name, options) {
      if (!name || !options) {
        throw new Error('Too few arguments specified in db.createTable');
      }

      if (typeof name !== 'string') {
        throw new Error('Invalid typeof parameter specified in db.createTable');
      }

      const { column } = options;

      let sql = `ALTER TABLE ${name}`;

      if (column) {
        if (!column.type || !column.properties) {
          throw new Error('Column properties are missing in db.editTable');
        }

        validateProps(column.properties);

        const keys = [];
        for (const key in column.properties) {
          keys.push(`${key} ${column.properties[key]}`);
        }

        sql = sql + ` ${column.type} COLUMN ${keys.join(', ')}`;

        const result = client.query(sql, (err, result) => {
          if (err) {
            return console.log(err.message);
          }
        });

        return result;
      }
    },

    // tableName: table that the document will be inserted into, doc: document (js object) to insert into table.
    insertOne: function (tableName, doc) {
      if (!doc || !tableName) {
        throw new Error('Too few arguments specified in db.insertOne');
      }

      if (typeof tableName !== 'string') {
        throw new Error('Invalid type specified for tableName in db.insertOne');
      }

      if (typeof doc !== 'object') {
        throw new Error('Invalid type specified for doc in db.insertOne');
      }

      const keys = [];
      const values = [];

      for (const key in doc) {
        keys.push(key);
        values.push(`'${doc[key]}'`);
      }

      const sql = `INSERT INTO ${tableName} (${keys.join(
        ', '
      )}) VALUES (${values.join(', ')})`;

      const result = client.query(sql, (err, result) => {
        if (err) {
          return console.log(err.message);
        }
      });

      return result;
    },
  };

  return db;
}

module.exports = configClient;
