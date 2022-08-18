const mysql = require("mysql");
const dbOption = require("../config/db_config");
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('连接数据库成功')
}).catch(err => {
  console.log(err, '连接数据库失败')
})


// 创建连接池
const pool = mysql.createPool(dbOption);

function query(sql, params) {
  return new Promise((resolve, reject) => {
    // 获取连接
    pool.getConnection((err, conn) => {
      if (err) {
        return reject(err);
      }
      // 执行sql语句
      conn.query(sql, params, (err, result) => {
        conn.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

module.exports = query