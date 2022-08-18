# 什么是MongoDB

- MongoDB是⽤C++语⾔编写的⾮关系型数据库
- MongoDB与mysql的区别

| |MongoDB|mysql|
| -- | -- | -- |
| 数据库模型 | ⾮关系型 | 关系型 |
| 表 | collection集合 | table⼆维表 |
| 表的⾏数据 | document⽂档 | row记录 |
| 数据结构 | 虚拟内存+持久化 | 不同引擎不同储存⽅式 |
| 查询语句 | mongodb查询⽅式（类似js函数） | sql语句 |
| 数据处理 | 将热数据存储在物理内存中，从⽽达到快速读写 | 不同引擎有⾃⼰的特点 |
| 事务性 | 不⽀持 | ⽀持事务 |
| 占⽤空间 | 占⽤空间⼤ | 占⽤空间⼩ |
| join操作 | 没有join | ⽀持join |

- mongodb数据库软件及可视化软件安装
  - 数据库软件安装地址：<https://www.mongodb.com/download-center/community>
  - 可视化软件安装地址：<https://www.mongodb.com/download-center/compass>

- 启动mongodb命令
  - Windows

  ```bash
    //启动
    net start mongodb
    //关闭
    net stop mongodb
  ```

- 安装 mongoose 包

 ```bash
    npm install mongoose
 ```

- 数据库连接

  ```js
  const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/user_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('连接数据库成功')
    }).catch(err => {
        console.log(err, '连接数据库失败')
    })

  ```
