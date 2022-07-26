const http = require("http");
const routerModule = require("../route/index");

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk;
    });

    req.on("end", () => {
    //   console.log(postData);
      resolve(JSON.parse(postData));
    });
  });
};

const server = http.createServer((req, res) => {
  // 解决跨域-允许跨域，*表示允许任意域名跨域
  // res.setHeader("Access-Control-Allow-Origin", "*")

  // 如果需要指定地址，就这样写
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.writeHead(200, { "content-type": "application/json;charset=UTF-8" });

  getPostData(req).then((data) => {
    req.body = data;

    // 去路由判断是否存在
    let result = routerModule(req, res);
    if (result) {
      result.then((resultData) => {
        res.end(JSON.stringify(resultData));
      });
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("404 NOT FOUND");
    }
  });
});

server.listen(3000, () => {
  console.log("监听3000端口");
});
