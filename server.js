var http = require('http');
var url = require('url');
var fs = require('fs');

var port = 8086

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log(filename);
  if (filename=="./"){
      filename = "./index.html"
  }
  fs.readFile(filename, function(err, data) {
    if (err) {

      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found <a href=\"index.html\">Go to Home</>");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(port); 

console.log("LISTENING on ", port)