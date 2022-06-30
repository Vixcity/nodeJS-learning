# 项目相关

```bash
# 初始化项目
npm init -y

# 安装依赖
npm i

# 启动项目
node app.js
```

## 依赖

- <https://www.lodashjs.com/>
- <https://www.npmjs.com/package/chokidar>

## 基础知识

```js
// globalThis 定义的对象可以在全局中被访问到
// 例：
globalThis.a = 2
```

## Node文档

### Buffer

<http://nodejs.cn/learn/nodejs-buffers>

### 文件系统模块

<http://nodejs.cn/learn/the-nodejs-fs-module>

```js
const fs = require('fs');
const chokidar = require('chokidar');

// 读取文件
fs.readFile('./helloWorld.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

// 写入文件 - 内容覆盖
fs.writeFile('./helloWorld.txt', 'this is a test', 'utf8', err => {
    if (err) throw err
    console.log("写入成功")
})

// 追加写入，可以用buffer写，也可以用普通的文本字符写
const buf = Buffer.from('\nHello World!')
fs.appendFile('./helloWorld.txt',buf,err => {
    if(err) throw err
    console.log('追加写入成功')
})

// 获取文件信息 主要用来判断 文件||文件夹
fs.stat('./helloWorld.txt', (err, stats) => {
    if (err) throw err
    console.log(stats.isFile())
    console.log(stats.isDirectory())
})

// 重命名文件
fs.rename('./helloWorld.txt', 'hello.txt', err => {
    if (err) throw err
    console.log('重命名成功')
})

// 删除文件
fs.unlink('./helloWorld.txt', err => {
    if (err) throw err
    console.log('删除成功')
})

// 创建文件夹
fs.mkdir('./testDir', err => {
    if (err) throw err
    console.log('创建文件夹成功')
})

// 递归创建
fs.mkdir('./testDir/testDirSon', {
    recursive: true
}, err => {
    if (err) throw err
    console.log('创建文件夹成功')
})

// 读取文件夹
fs.readdir('./', {
    // 带上文件类型
    withFileTypes: true
}, (err, files) => {
    if (err) throw err
    console.log(files)
})

// 删除文件夹
fs.rmdir('./testDir', {
    // 递归删除，可以删除内部有东西的文件夹
    recursive: true
}, err => {
    if (err) throw err
    console.log('删除文件夹成功')
})

// 监听文件变化
fs.watch('./', {
    // 监视子目录
    recursive: true
}, (eventType, fileName) => {
    console.log(eventType, fileName)
})

// 监听文件变化可以用另一个更好的包
// chokidar
// npm i chokidar --save-dev
chokidar.watch('./', {
    // 不监听
    ignored: './node_modules'
}).on('all', (event, path) => {
    console.log(event, path)
})
```

### 文件流

<http://nodejs.cn/learn/nodejs-streams>

```js
const fs = require('fs');

// 读取流
let rs = fs.createReadStream('./app.js', {
    // 每次 on data 的一个数据量
    highWaterMark: 100
})

let count = 1
rs.on('data', chunk => {
    console.log(chunk.toString())
    console.log(count++)
})

rs.on('end', () => {
    console.log('读取完成')
})


// 写入流
let ws = fs.createWriteStream('./helloWorld.txt')

let num = 0
let timer = setInterval(() => {
    if (num < 10) {
        ws.write(num + '\n')
        num++
    } else {
        ws.end('写入完成')
        clearInterval(timer)
    }
}, 200)

ws.on('finish', () => {
    console.log('写入完成')
})


// 管道流，从数据的来源，通过管道，一段一段的流向目标
let rs = fs.createReadStream('./app.js')
let ws = fs.createWriteStream('./helloWorld.txt')
// 读取流的pipe方法，写入到写入流里面
rs.pipe(ws)
```
