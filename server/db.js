const mysql = require('mysql');
const sql = require('./db/sql.js');

const dbInfo = {
    connetionLimit : process.env.MYSQL_LIMIT,
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database : process.env.MYSQL_DATABASE,    
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
}

const dbPool = mysql.createPool(dbInfo);

module.exports = {
     connection(table, alias, param = []) {
      return new Promise((resolve, reject) => dbPool.query(sql[table][alias], param, (error, results) => {
        if (error) {
          console.log(error); // DB연결 에러를 콘솔에서 보기.         
          reject({error});
        } else {
          console.log(results); // DB연결 성공결과를 콘솔에서 보기.
          resolve(results);
        };
      }));
    },
    trsConnection(trs) {
      return new Promise((resolve, reject) => dbPool.query(trs, (error, results) => {
        if (error) {
          console.log(error); // DB연결 에러를 콘솔에서 보기.         
          reject({error});
        } else {
          console.log(results); // DB연결 성공결과를 콘솔에서 보기.
          resolve(results);
        };
      }));
    }
  };