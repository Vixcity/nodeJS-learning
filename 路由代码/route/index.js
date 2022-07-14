const url = require('url');

function handleRequest(req, res) {
    let urlObj = url.parse(req.url, true)

    if (urlObj.pathname === '/' && req.method === "GET") {
        return {
            message: '获取成功'
        }
    }
    
    if (urlObj.pathname === '/api' && req.method === "POST") {
        return {
            message: '更新成功'
        }
    }
}

module.exports = handleRequest