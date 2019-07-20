require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
});

function query(sql) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function queryByFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf-8', function (err, sql) {
      if (err) reject(err);
      return resolve(query(sql));
    });
  });
}

module.exports = {
  query,
  queryByFile
};
