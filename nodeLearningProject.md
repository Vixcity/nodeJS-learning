# 项目

## 路由

通过pathname请求获取地址

路由代码请查看路由代码文件夹

用户列表增删改查

## 跨域

### 什么是跨域？

浏览器同源策略：协议+域名+端⼝三者相同就是同源。

<http://www.baidu.com/a.js> <http://www.baidu.com/b.js>

<https://www.baidu.com/a.js> <http://www.baidu.com/a.js> 协议不同

<https://www.baidu.com:8080/a.js> <https://www.baidu.com/a.js> 端⼝不同

<https://www.baidu.com:8080/a.js> <https://www.a.com:8080/a.js> 域名不同

跨域：协议、域名、端⼝三者任意⼀个不同就是跨域。

### 前端请求跨域提示

![跨域](https://s2.loli.net/2022/07/15/CqeHZR24WmcuM9r.png)

在创建服务的时候添加上以下代码

```js
    // 解决跨域-允许跨域，*表示允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    
    // 如果需要指定地址，就这样写
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
```

示例：

``` js
const server = http.createServer((req, res) => {
    // 解决跨域-允许跨域，*表示允许任意域名跨域
    // res.setHeader("Access-Control-Allow-Origin", "*")
    
    // 如果需要指定地址，就这样写
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // 注意，这里的 res.writeHead 不可以重复写多次，否则服务端会弹出一个警告
    res.writeHead(200, { "content-type": 'application/json;charset=UTF-8' })

    getPostData(req).then(data => {
        req.body = data

        let resultData = routerModule(req, res)
        if (resultData) {
            res.end(JSON.stringify(resultData))
        } else {
            res.writeHead(404, { "content-type": 'text/html' })
            res.end('404 NOT FOUND')
        }
    })
})
```
