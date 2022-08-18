const url = require("url");
const {
  getUserList,
  addUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

function handleRequest(req, res) {
  let urlObj = url.parse(req.url, true);

  if (urlObj.pathname === "/list/user" && req.method === "GET") {
    let resultData = getUserList(urlObj.query);
    return resultData;
  }

  // 存在接口
  if (urlObj.pathname === "/add/user" && req.method === "POST") {
    // 去执行操作，进到对应的controller里面
    let resultData = addUser(req.body, "index.js");
    return resultData
  }

  if (urlObj.pathname === "/delete/user" && req.method === "POST") {
    let resultData = deleteUser(urlObj.query.id);
    return resultData;
  }

  if (urlObj.pathname === "/update/user" && req.method === "POST") {
    // 去执行操作，进到对应的controller里面
    let resultData = updateUser(urlObj.query.id, req.body);
    return resultData;
  }

  if (urlObj.pathname === "/api/getUserList" && req.method === "GET") {
    return [];
  }
}

module.exports = handleRequest;
