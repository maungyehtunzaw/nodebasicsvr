const http = require('http');
const fs = require('fs');

function htmlRespone(res,html){
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end(html);
}
function jsonResponse(res,data){
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    data=JSON.stringify(data);
    res.end(data);
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let url=req.url;
  let htmlRes="";
  switch(url){
    case "/": htmlRes=fs.readFileSync("welcome.html");htmlRespone(res,htmlRes);
          break;
    case "/about": htmlRes=fs.readFileSync("about.html");htmlRespone(res,htmlRes);
          break;
    case "/contact":
          console.log(req);
          htmlRes=fs.readFileSync("contact.html");htmlRespone(res,htmlRes);
          break;
    case "/api/postf": let data1=require("./posts.json");
    jsonResponse(res,data1);break;
    
    case "/api/posts":
      let data=[{
        "title":"HELLLO WORLD",
        "title2":"Hello War"
      }];
      jsonResponse(res,data);
    default:htmlRes=fs.readFileSync('404.html');htmlRespone(res,htmlRes);break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
