const mysql = require('mysql');

// 创建连接
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     port: '3306',
//     database: 'user_test',
// })
// 创建连接池
const pool = mysql.createPool({
    // 最大连接数
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'user_test',
})

// 获取连接
pool.getConnection((err, conn) => {
    if (err) throw err
    let sql = 'select * from user where id = ?'

    // 执行sql语句
    conn.query(sql, [4], (err, result) => {
        conn.release()
        if (err) throw err
        console.log(result)
    })
})

// let sql = 'select * from user where id = ?'

// 执行sql语句
// conn.query(sql,[4],(err,result) => {
//     if(err) throw err
//     console.log(result)
// })

// conn.end()