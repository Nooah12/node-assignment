const http = require("http");
const fs = require("fs");
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === "/hello") {
    res.statusCode = 200;
    res.write("<p>hello world</p>");
    res.end();
  } else if (req.url === "/cities") {
    res.statusCode = 200;
    res.write("<p>Stockholm is the capital of Sweden</p>");
    res.end();
  } else {

    let address = url.parse(req.url, true);
    let path = "./html/";
    if (req.url === "/") {
      path += "homepage.html";
      res.statusCode = 200;
    }
    /* console.log("URL: " + req.url + "Pathname: " + address.pathname) */
    if (address.pathname === '/about') {

      let queries = url.parse(req.url,true).query
      if (queries.location) {
        if (queries.location === 'barcelona') {
          path += "barcelona.html"
        } else if (queries.location === 'madrid'){
          path += "madrid.html"
        } else {
          path += '404.html'
        }
      } else {
        path += "about.html"
      }

    }
    /* console.log("Path: " + path); */
    fs.readFile(path, (err, data) => {
      
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.end(data);
      }
    });
  }
})

server.listen(3000);
console.log("Listen on port 3000...");
