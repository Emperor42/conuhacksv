var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var port = 8102 //try different ports if not working
var data = "TEMP";
//define events
//dealing with the events
  //Create an event handler:
  var aHandler = function () {
    console.log('EVENT');
  }

  //Assign the event handler to an event:
  eventEmitter.on('test', aHandler);

http.createServer(function (req, res) {
  console.log(req.method);
  if (req.method=="POST"){
    //general data handling
    console.log(req.headers)
    console.log(req.read);
    var body = '';
        req.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post['to']);
            if(post['to']=='test'){
              eventEmitter.emit('test');
            }
          //PROCESS EVERYTHING OUT AS NEDED

        });
  }
  if (req.method=="GET"||req.method=="POST"){
    //get or post only, always check events
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log(filename);
    //register the different end points, this must be first
    if (filename=="./"||filename.includes("index")){
        filename = "./index.html"
    }
    //other site checks to run through
    fs.readFile(filename, function(err, data) {
      if (err) {

        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found <a href=\"index.html\">Go to Home</>");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
  


}).listen(port); 


console.log("LISTENING on ", port)