const http = require('http');
const PORT = 4007;  
const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type','text/html');
//   res.end("<h2>Hello from Node.js Server</h2>");
  if(req.url == '/msg' && req.method == "GET"){
      res.setHeader('Content-Type','text/html');
    res.end("<h2>Hello from Node.js Server</h2>");
  }

  if(req.url == '/data' && req.method =="POST"){
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({msg:"this is json data"}));
  }

  if(req.url == '/data' && req.method =="DELETE"){
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({msg:"Delete json data"}));
  }

  
})


server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}/`);
})