const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

function htmlRespone(res,html){
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    let htmlRes=fs.readFileSync(html);
    res.end(htmlRes);

    //reading file async with callback
   /*
    fs.readFile(html,(err,data)=>{
        if(err) throw err;
        res.end(data);
    });
    */

}
function jsonResponse(res,data){
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    let data=require(jsonFile);
    data=JSON.stringify(data);
    res.end(data);

}

const hostname = 'localhost';
const port = 80;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  let method=req.method;
  if(method=="POST"){
      let formData='';
        req.on('data',chunk=>{
            formData+=chunk.toString();
        });
        req.on('end',()=>{
            console.log(parse(formData));
        });
  }
  let url=req.url;
  switch(url){
    case "/": htmlRespone(res,"welcome.html");
          break;
    case "/about":htmlRespone(res,"about.html");
          break;
    case "/contact":htmlRespone(res,"contact.html");
          break;
    case "/api/posts": jsonResponse(res,"./posts.json");
          break;    
    default:htmlRespone(res,"404.html");break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
