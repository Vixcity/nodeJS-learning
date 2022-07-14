const http = require('http');
const routerModule = require('../route/index')

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": 'application/json;charset=UTF-8' })

    let resultData = routerModule(req, res)

    if (resultData) {
        res.end(JSON.stringify(resultData))
    } else {
        res.writeHead(404, { "content-type": 'text/html' })
        res.end('404 NOT FOUND')
    }
})

server.listen(3000, () => {
    console.log('监听3000端口')
})