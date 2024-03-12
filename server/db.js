const mysql = require('mysql');
const sql = require('./db/sql.js');

const dbInfo = {
    connectionLimit : process.env.MYSQL_LIMIT,
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
    // 커넥션 가져오기
    getConnect() {
      return new Promise((resolve, reject) => dbPool.getConnection((error, conn) => {
        if (error) {
          console.log(error); // DB연결 에러를 콘솔에서 보기.         
          reject({error});
        } else {
          console.log(conn); // DB연결 성공결과를 콘솔에서 보기.
          resolve(conn);
        };
      }));
    },

    // 트랜잭션 내 sql 실행
    sqlConnection(conn, table, alias, param = []) {
      return new Promise((resolve, reject) => conn.query(sql[table][alias], param, (error, results) => {
        if (error) {         
          reject({
            error
          });
        } else { 
        resolve(results);
       console.log(results)
      }
      }));
    },

    // 트랜잭션 실행 구문
    trsConnection(conn, tcl) {
      return new Promise((resolve, reject) => conn.query(tcl, (error, results) => {
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