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

  //Make a user
  var aNewUserHandler = function () {
    console.log('EVENT: NewUser');
  }
  //Assign the event handler to an event:
  eventEmitter.on('newUser', aNewUserHandler);

  //Make a group
  var aNewGroupHandler = function () {
    console.log('EVENT: NewGroup');
  }
  //Assign the event handler to an event:
  eventEmitter.on('newGroup', aNewGroupHandler);

  //Make a task
  var aNewTaskHandler = function () {
    console.log('EVENT: NewGroup');
  }
  //Assign the event handler to an event:
  eventEmitter.on('newTask', aNewGroupHandler);

  http.createServer(function (req, res) {
    //make the cookies object
    var cookies = new Cookies(req, res, { keys: keys });

    /*
  // Get a cookie
  var lastVisit = cookies.get('LastVisit', { signed: true })

  // Set the cookie to a value
  cookies.set('LastVisit', new Date().toISOString(), { signed: true })
    
  */

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
          filename = "./index.html";
      }
      //the event rule to remove extra and send to old
      if(filename.includes("index")){
        filename = "./index.html";
      }
   
      //other site checks to run through
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found <a href=\"index.html\">Go to Home</>");
        }
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

/*
  Defines a security layer as needed, default is plaintext
*/
function generalSecurityLayer(message, seed, pwd){
  
}