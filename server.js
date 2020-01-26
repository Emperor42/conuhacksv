var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var port = 4242; //try different ports if not working
//cookie key setup
var Cookies = require('cookies');
var keys = ['keyboard cat'];




//database setup
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Dev:<password>@conuhacks-g1c1s.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  //define the collection for the user, has 
  const userCollection = client.db("main").collection("users");
  //define the collection for the group, has 
  const groupCollection = client.db("main").collection("groups");
  //define the collection for the tasks, has 
  const taskCollection = client.db("main").collection("tasks");



  //define events
  //dealing with the events
  //Create an event handler:
  var aHandler = function () {
    console.log('EVENT');
  }

  //Assign the event handler to an event:
  eventEmitter.on('test', aHandler);

  //START: Actual Event Handlers

  var filename = "";

  http.createServer(function (req, res) {
    //make the cookies object
    var cookies = new Cookies(req, res, { keys: keys });
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    tasks = 1;
    users = 1;

    //START: General Varables for the cookies that we need
    var userCode = cookies.get('UserCode', { signed: true });
    var iAmAdmin = cookies.get('IAmAdmin', { signed: true });
    console.log(req.method);
    if(req.method==='POST'){
      
      if(iAmAdmin){
        res.writeHead(302, {
          'Location': '/admin'
          //add other headers here...
        });
        return res.end();
      }
      else{
        res.writeHead(302, {
          'Location': '/'
          //add other headers here...
        });
        return res.end();
      }
    }

    if (req.method==="GET"){
      //get or post only, always check events
      console.log(filename);
      //register the different end points, this must be first
      if (req.url==='/test'){
        res.writeHead(302, {
          'Location': '/',
          'Content-type' : 'text/json'
          //add other headers here...
        });
       res.write(' [{ title  : \'event3\',start  : \'2010-01-09T12:30:00\',allDay : false }]');
        return res.end();
    }
      if (req.url==='/'){
          filename = "./index.html";
      }
      if (req.url==='/admin'){
        filename = "./admin.html";
      }
    }
      //other site checks to run through
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found <a href=\"index.html\">Go to Home</>");
        }
        //read through line by line and edit a file
        
        if (filename.includes(".css")){
          res.writeHead(200, {'Content-type' : 'text/css'});
          res.write(data);
          return res.end();
        } 
        if (filename.includes(".js")){
          res.writeHead(200, {'Content-type' : 'text/javascript'});
          res.write(data);
          return res.end();
        } 
        res.writeHead(200, {'Content-Type': 'text/html', 'profile': 'test'});
        res.write(data);
        res.end();
        return;
      });
    
    


  }).listen(port); 
  

  // perform actions on the collection object
  client.close();
});

console.log("LISTENING on ", port)
