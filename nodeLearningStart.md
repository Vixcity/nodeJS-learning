# NodeJS学习内容

## 项目相关

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
- <https://github.com/cheeriojs/cheerio/wiki/Chinese-README>
- <https://www.npmjs.com/package/mysql>
- <https://mongoosejs.com/docs/connections.html>

nodemon - 自动重启

- <https://github.com/remy/nodemon/blob/master/doc/requireable.md>
- <https://github.com/remy/nodemon/blob/master/doc/events.md#Using_nodemon_as_child_process>

数据库
[数据库模块用法](https://www.jianshu.com/p/6a9caa0930d3?u_atoken=19d81abe-26f8-40ae-8250-0b8e9b008062&u_asession=01Po9spBp3X7q6IlcadbgrWTeK6zvwo6msEGjGP8oOO382bIZ8Z8WdqVlkz8_869b4X0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K8cL0hsNR7w0bNEwvVME9puMKWrbBzYAhXhkL4v5_cjQmBkFo3NEHBv0PZUm6pbxQU&u_asig=05WNt_hYBhw9zV7ayn6DKF9V7sEHEtPoCNdSDUO9xd8YSpgOfh_GUHqmY8ORrYn4fgqflfOKiNJHHbVdW-j4Cbhg5awcY9Wmw8ACmHClGef3NCPzvppD4Abx-sR4z38qhtfqlwLagJa0Hqll2j1qil3VXZ8DNFa2G3Wj1GF6lgOrP9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzaQNbc1n41RhPu1iIiVUlXLGEHO4eRt4dhLiOqeZeXAXdf9JIAkyKervFWgmMgV8j-3h9VXwMyh6PgyDIVSG1W8pItgBn8boh-1pRne_4z555wXlYElZ4cq7YXSAdlfppYXEaoGkAsF9z55za78rI5JvgtmdXIKTcM-Vsg4gF3hqmWspDxyAEEo4kbsryBKb9Q&u_aref=YNBPPEbse%2FRep6jcUVBk6ZIoMMg%3D)

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

### path

<http://nodejs.cn/api/path.html>

```js
const path = require('path');

console.log(path.basename('/app.js','.js')) // app.js 后面的为省略后缀名
console.log(path.dirname('/app.js')) // /
console.log(path.extname('app.js')) // .js
console.log(path.join('/nodeJS-learning/','/app.js')) // 拼接 \nodeJS-learning\app.js
console.log(path.normalize('/nodeJS-learning//app.js')) // 规范化路径 \nodeJS-learning\app.js
console.log(path.resolve('./app.js')) // 绝对路径 C:\Users\47072\Desktop\project\nodeJS-learning\app.js
let pathObj = path.parse("/nodeJS-learning/app.js") // 将路径转化为对象
console.log(pathObj) 
console.log(path.format(pathObj)) // 将对象转化为路径
console.log(path.sep) // 系统路径的分隔符
console.log(path.win32.sep) // window下的分隔符
console.log(__filename) // 当前所在路径绝对目录 是绝对正确的 resolve 执行的地方不同可能是会有错误的
console.log(__dirname) // 当前目录绝对目录
```

### 事件触发器

<http://nodejs.cn/api/events.html>

```js
const EventEmitter = require('events')

class MyEmitter extends EventEmitter { }

let myEmitter = new MyEmitter()

myEmitter.on('hi', (a,b) => {
    console.log('触发了事件',a+b)
})

myEmitter.once('once', (a,b) => {
    console.log('触发了一次',a+b)
})

// 触发事件
myEmitter.emit('hi',1,2)

// 只会触发一次
myEmitter.emit('once',1,2)
myEmitter.emit('once',1,2)

let fn1 = (a,b) => {
    console.log('带参',a+b)
}

let fn2 = () => {
    console.log('不带参')
}

myEmitter.on('hi1', fn1)
myEmitter.on('hi1', fn2)

// 移除数组
// myEmitter.removeListener('hi1',fn1)
// 移除全部数组
myEmitter.removeAllListeners('hi1')
myEmitter.emit('hi1',1,2)
```

### util

<http://nodejs.cn/api/util.html>

```js
const util = require('util');
const fs = require('fs');

async function hello() {
    return 'hello World!'
}

// 将异步函数转换成为有回调风格的函数
let helloCallBack = util.callbackify(hello)

helloCallBack((err, res) => {
    if (err) throw err
    console.log(res)
})

// 转换成为promise版本的函数
let stat = util.promisify(fs.stat)
let stat1 = util.promisify(fs.stat)

stat('./app.js').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

async function statFn() {
    try {
        let stats = await stat1('./app.js')
        console.log(stats)
    } catch (e) {
        console.log(e)
    }
}

statFn()

// 判断值是否为date类型
console.log(util.types.isDate(new Date()), util.types.isDate(1))
```

### http基本知识

---

- GET 请求指定的⻚⾯信息，并返回实体主体
- HEAD 类似于get请求，只不过返回的响应中没有具体的内容，⽤于获取报头
- POST 向指定资源提交数据进⾏处理请求。数据被包含在请求体中。
- PUT 从客户端向服务器传送的数据取代指定的⽂档的内容
- DELETE 请求服务器删除指定的⻚⾯
- CONNECT HTTP/1.1协议中预留给能够将连接改为管道⽅式的代理服务器。
- OPTIONS 允许客户端查看服务器的性能
- TRACE 回显服务器收到的请求，主要⽤于测试或诊断

---

| 应答头 | 说明 |
| :--   | :-- |
| Allow | 服务器⽀持哪些请求⽅法（如get、post等）。
| Content-Encoding| ⽂档的编码⽅法。只有在解码之后才可以得到Content-Type头指定的内容类型。利⽤gzip压缩能减少HTML⽂档的下载时间。
| Content-Length|  表示内容⻓度。只有当浏览器使⽤持久http连接时才需要这个数据。
| Content-Type | 表示⽂档属于什么MIME(文件)类型。
| Date | 当前的GMT时间。
| Expires | 资源什么时候过期，不再缓存，会重新向服务器请求页面。
| Last-Modified | ⽂档最后改动时间。
| Location | 重定向的地址。
| Server | 服务器的名字。
| Set-Cookie | 设置和⻚⾯关联的Cookie。
| WWW-Authenticate | 定义了使⽤何种验证⽅式去获取对资源的链接。

---

#### 常⻅的http状态码

- 200 请求成功
- 301 资源被永久转移到其他URL
- 404 请求的资源（⽹⻚等）不存在
- 500 内部服务器错误

---

| 分类 | 分类描述                                       |
| :--- | ---------------------------------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执⾏操作   |
| 2**  | 成功，操作被成功接收并处理                     |
| 3**  | 重定向，需要进⼀步的操作以完成请求             |
| 4**  | 客户端错误，请求包含语法错误或⽆法完成请求     |
| 5**  | 服务器错误，服务器在处理请求的过程中发⽣了错误 |

---

#### Content-Type 内容类型

常⻅的媒体格式类型如下

- text/html:HTML格式
- text/plain:纯⽂本格式
- text/xml:XML格式
- image/gif:gif图⽚格式
- image/jpeg:jpg图⽚格式
- image/png:png图⽚格式
- multipart/form-data:需要在表单中进⾏⽂件上传时，就需要使⽤该格式

以application开头的媒体格式类型：

- application/xhtml+xml:XHTML格式
- application/xml:XML数据格式
- application/atom+xml:Atom XML聚合格式
- application/json:JSON数据格式
- application/pdf:pdf格式
- application/msword:Word⽂档格式
- application/octet-stream:⼆进制流数据（常⻅的⽂件下载)
- application/x-www-form-urlencoded:表单中默认的encType,表单数据被编码为key/value格式发送到服务器

### 搭建Http服务器

<http://nodejs.cn/learn/build-an-http-server>

```js
const http = require('http');

const serve = http.createServer((req, res) => {
    // 写响应头的一些信息
    // 会执行两次请求，一次是页面，一次是favicon.ico
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end('<h1>hello world</h1>')
})

// 监听了3000端口
serve.listen(3000, () => {
    console.log('监听了3000端口')
})
```

### 实战

```js
// 简易爬虫
// 链接如果是http就引入http
// 链接如果是https就引入http
const http = require('https');
const fs = require('fs');
// 可以在Node中进行DOM操作，类似JQuery
const cheerio = require('cheerio');

http.get('https://vixcity.vercel.app/', (res) => {
    res.setEncoding('utf8')

    let html = ''
    res.on('data', chunk => {
        html += chunk
    })

    res.on('end', () => {
        console.log(html)
        // 加载html代码，实现JQuery的DOM操作
        const $ = cheerio.load(html)
        // 获取title元素的文本
        console.log($('title').text())
        fs.writeFile('./index.html', html, (err) => {
            if (err) throw err
            console.log('爬虫爬取成功')
        })
    })
})
```

### 获取Get和Post请求

<http://nodejs.cn/api/url.html>

注意点：post请求是流模式

```js
const url = require('url');
const http = require('http');

// 第二个参数为是否解析query
// console.log(url.parse('http://nodejs.cn/api/url.html?type=2&asd1=1',true))

// 获取GET请求
const serve = http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true)
    console.log(urlObj)
    res.end(JSON.stringify(urlObj.query))
})

serve.listen(3000, () => {
    console.log('监听3000端口')
})

// 获取POST请求
const serves = http.createServer((req, res) => {
    let postData = ''
    req.on('data', chunk => {
        postData += chunk
    })

    req.on('end', () => {
        console.log(postData)
    })

    res.end(JSON.stringify({
        data: '请求成功',
        code: 0
    }))
})

serves.listen(3001, () => {
    console.log('监听3001端口')
})

// 整合post 和 get 请求
const serve3002 = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let urlObj = url.parse(req.url, true)
        console.log(urlObj)
        res.end(JSON.stringify(urlObj.query))
    } else if (req.method === "POST") {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })

        req.on('end', () => {
            console.log(postData)
        })

        res.end(JSON.stringify({
            data: '请求成功',
            code: 0
        }))
    }
})

serve3002.listen(3002, () => {
    console.log('监听3002端口')
})
```
