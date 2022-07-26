# mysql介绍

简介：介绍mysql及mysql软件推荐

- 什么是mysql？

    mysql是⼀个数据库管理系统。数据库是存储、管理数据的仓库

- mysql环境安装配置
  - windows安装及配置

    ```bash
    windows安装配置教程 https://blog.csdn.net/qq_37350706/article/details/81707862
    ```

  - mac安装及配置

    ```bash
    mac下mysql8安装教程：https://blog.csdn.net/luzhensmart/article/details/82948133
    ```

## mysql常⽤数据库操作语句

简介：数据库中常⽤的操作语句

- 增加表格数据

    ```sql
    INSERT INTO table_name ( field1, field2,...fieldN ) VALUES (value1,value2,...valueN)
    --  往user表插⼊⼀条数据
    insert into user (name,city,sex) values ('小小','北京',1)
    ```

- 删除表格数据

    ```sql
    DELETE FROM table_name [WHERE Clause]
    -- 删除⽤户id为5的⽤户
    delete from user where id = 5
    ```

- 修改表格数据

    ```sql
    UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
    -- 修改⽤户id为5的信息
    update user set name='⼩天',city='深圳' where id = 5
    ```

- 查询表格数据

    ```sql
    SELECT column_name,column_name FROM table_name [WHERE Clause]
    -- 查询所有⽤户信息，*表示显示所有字段信息
    select * from user
    -- 查询所有⽤户信息，只显示name和city信息
    select name,city from user
    -- 查询id为4的⽤户
    select name,city from user where id = 4
    -- 同时满⾜两个条件⽤and
    select name,city from user where city = '北京' and sex = 1
    ```

- 排序

    ```sql
    SELECT field1, field2,...fieldN FROM table_name1, table_name2...
    ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
    默认asc升序排序，desc降序排序
    -- 根据id进⾏降序排序
    select * from user order by id desc
    ```

- 模糊查询

    ```sql
    SELECT field1, field2,...fieldN FROM table_name WHERE field1 LIKE
    condition1
    -- 查询名字带有红的⽤户
    select * from user where name like '%红%'
    ```

## NodeJs连接mysql数据库

简介：讲解nodejs安装mysql及连接mysql数据库⽅式

- mysql模块安装

```bash
npm install mysql --save
```

- 连接数据库

``` js
const mysql = require('mysql')
//创建连接
const conn = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'123456789',
 port:'3306',
 database:'user_test'
})
//建⽴连接
conn.connect()
let sql = 'select * from user where id = ?'
//执⾏sql语句
conn.query(sql,[4],(err,result)=>{
 if(err) throw err
 console.log(result)
})
//关闭连接
conn.end()
```

- 通过占位符实现传参,query⽅法第⼆参数就是会填充sql语句⾥的'?'，如果有多个就会传入多个

```js
let sql = 'select * from user where id = ?'
//执⾏sql语句
conn.query(sql,[4],(err,result)=>{
 if(err) throw err
 console.log(result)
})
```

## 深度讲解mysql连接池

简介：mysql连接池与普通连接的区别以及它的使⽤⽅式

- 频繁的创建、关闭连接会减低系统的性能，提⾼系统的开销

![mysql连接池](https://s2.loli.net/2022/07/15/Qxuh3pcvGmHwMZ9.png)

- 连接池可以有效的管理连接，达到连接复⽤的效果

![复用](https://s2.loli.net/2022/07/15/uc9A4BCQ6olTUzy.png)

- 连接池的使⽤

```js
const mysql = require('mysql')
//创建连接池
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
```

## 大体流程

先到server层，这一层是进行分发的 => 然后去路由层，这一层进行寻找对应controller层操作 => 在然后去controller层，这一层是进行数据库操作的

增删改查的方法我写在注释当中
