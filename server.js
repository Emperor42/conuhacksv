var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var port = 8106 //try different ports if not working
//cookie key setup
var Cookies = require('cookies');
var keys = ['keyboard cat'];


//database setup
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Dev:<password>@conuhacks-g1c1s.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  
  //define events
  //dealing with the events
  //Create an event handler:
  var aHandler = function () {
    console.log('EVENT');
  }

  //Assign the event handler to an event:
  eventEmitter.on('test', aHandler);

  http.createServer(function (req, res) {
    //make the cookies object
    var cookies = new Cookies(req, res, { keys: keys })

  // Get a cookie
  var lastVisit = cookies.get('LastVisit', { signed: true })

  // Set the cookie to a value
  cookies.set('LastVisit', new Date().toISOString(), { signed: true })
    
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
      //REM: COOKIES TEST
      if (filename.includes("cookietest")){
        res.setHeader('Content-Type', 'text/plain')
        if (!lastVisit) {
          
          return res.end('Welcome, first time visitor!')
        } else {
          
          return res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.')
        }
    }
    if (filename.includes("cookieclear")){
      res.setHeader('Content-Type', 'text/plain')
      cookies.set('COOKIE CLEARED: LastVisit', new Date().toISOString(), { signed: true })
      return res.end('Cookie CLeared!')
  }
    //END COOKIES TEST
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

  // perform actions on the collection object
  client.close();
});

console.log("LISTENING on ", port)