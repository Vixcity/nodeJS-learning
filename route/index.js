const url = require('url');
const { getUserList, addUser, deleteUser, updateUser } = require('../controller/user');

function handleRequest(req, res) {
    let urlObj = url.parse(req.url, true)

    if (urlObj.pathname === '/' && req.method === "GET") {
        let resultData = getUserList()
        return resultData
    }

    if (urlObj.pathname === '/api' && req.method === "POST") {
        let resultData = addUser(req.body)
        return resultData
    }

    if (urlObj.pathname === '/delete' && req.method === "POST") {
        let resultData = deleteUser(req.query.id)
        return resultData
    }

    if (urlObj.pathname === '/update' && req.method === "POST") {
        let resultData = updateUser(urlObj.query.id, req.body)
        return resultData
    }
    
    if (urlObj.pathname === '/api/getUserList' && req.method === "GET") {
        return []
    }
}

module.exports = handleRequest