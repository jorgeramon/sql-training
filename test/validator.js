const db = require('./db');
const { expect } = require('chai');

const PRIMARY_KEY = 'PRI';
const NONE_KEY = '';
const NULLABLE = 'YES';
const NOT_NULLABLE = 'NO';

async function validateFields(table, expectedFields) {
  const result = await db.query(`desc ${ table }`);

  for (let field of expectedFields) {
    const realField = result.find(x => x.Field === field.name);

    expect(realField).to.be.ok;

    if (typeof field.type !== "undefined") {
      expect(realField.Type).to.include(field.type);
    }

    if (typeof field.isPrimaryKey !== "undefined") {
      const result = await db.query(`SELECT
        TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
        FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE
        TABLE_SCHEMA = 'bedu_music' AND
        TABLE_NAME = '${ table }' AND
        COLUMN_NAME = '${ field.name }' AND
        CONSTRAINT_NAME = 'PRIMARY'`);

      if (field.isPrimaryKey) {
        expect(result).to.not.be.empty;
      } else {
        expect(result).to.be.empty;
      }
    }

    if (typeof field.isForeignKey !== "undefined") {
      const result = await db.query(`SELECT
        TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
        FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE
        TABLE_SCHEMA = 'bedu_music' AND
        TABLE_NAME = '${ table }' AND
        COLUMN_NAME = '${ field.name }' AND
        REFERENCED_TABLE_NAME = '${ field.references }'`);

      if (field.isForeignKey) {
        expect(result).to.not.be.empty;
      } else {
        expect(result).to.be.empty;
      }
    }

    if (typeof field.isNullable !== "undefined") {
      expect(realField.Null).to.equal(field.isNullable ? NULLABLE : NOT_NULLABLE);
    }
  }
}

async function validateTableExists(database, table) {
  const result = await db.query('show tables');
  const tables = result.map(x => x[`Tables_in_${ database }`]);

  expect(tables).to.include(table);
}

async function validateDatabaseExists(database) {
  const result = await db.query('show databases');
  const databases = result.map(x => x.Database);

  expect(databases).to.include(database);
}

module.exports = {
  validateFields,
  validateTableExists,
  validateDatabaseExists
};
