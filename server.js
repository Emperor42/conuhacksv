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


  http.createServer(function (req, res) {
    //make the cookies object
    var cookies = new Cookies(req, res, { keys: keys });
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    tasks = 1;
    users = 1;
    //START: General Varables for the cookies that we need
    var userCode = cookies.get('UserCode', { signed: true })
    var iAmAdmin = cookies.get('IAmAdmin', { signed: true })

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
             
              if(filename.includes("event")){
                if (iAmAdmin){
                  //addTask
                  if(filename.includes("addTask")){
                    post['code']= tasks++//gets the newest 
                    post['parent'] = -1;
                    taskCollection.insertOne(post, function(err, res) {
                      if (err) throw err;
                      console.log("1 document inserted");
                    });
                  }
                  //editTask
                  if(filename.includes("editTask")){
                    var query =  {code:post['code']};
                    found = taskCollection.updateOne(query,post, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //removeTask
                  if(filename.includes("removeTask")){
                    var query =  {code:post['code']};
                    found = taskCollection.deleteOne(query, function(err, res){
                      if (err) throw err;
                      console.log("1 document removed");
                    });
                  }
                  //removeUser
                  if(filename.includes("removeUser")){
                    var query =  {code:post['code']};
                    found = userCollection.deleteOne(query, function(err, res){
                      if (err) throw err;
                      console.log("1 document Removed");
                    });
                  }
                  //addUser
                  if(filename.includes("addUser")){
                    post['code']= users++//gets the newest 
                    userCollection.insertOne(post, function(err, res) {
                      if (err) throw err;
                      console.log("1 document inserted");
                    });
                  }
                }
                  //claim task (user calls, updates task)
                  if(filename.includes("claimTask")){
                    var query= {code:post['code'], status:false};//gets the newest 
                    var claims =  {worker:userCode};
                    found = taskCollection.updateOne(query,claims, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //end task (user calls, updates task)
                  if(filename.includes("endTask")){
                    var query= {code:post['code'], status:false};//gets the newest 
                    var claims =  {worker:-1};
                    found = taskCollection.updateOne(query,claims, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //complete task (user calls, updates task)
                  if(filename.includes("completeTask")){
                    var query= {code:post['code'], status:false};//gets the newest 
                    var claims =  {status:true};
                    found = taskCollection.updateOne(query,claims, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //split task
                  if(filename.includes("splitTask")){
                    var query= {code:post['code'], status:false};//gets the newest 
                    var nextSplit = post['split']+1;
                    var claims =  {status:nextSplit};
                    found = taskCollection.updateOne(query,claims, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //userData
                  if(filename.includes("userData")){
                    var query= {code:userCode};//gets the newest (should output the values directly)
                    found = taskCollection.findOne(query, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //updateData
                  if(filename.includes("updateData")){
                    var query =  {code:post['code']};
                    found = userCollection.updateOne(query,post, function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //findOpenTasks
                  if(filename.includes("userData")){
                    var query= {status:false, worker:-1};//gets the newest (should output the values directly)
                    found = taskCollection.find(query).toArray(function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //findUserTasks
                  if(filename.includes("findUserTasks")){
                    var query= {status:false, worker:userCode};//gets the newest (should output the values directly)
                    found = taskCollection.find(query).toArray(function(err, res){
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                  }
                  //findUserTasks
                  if(filename.includes("validate")){
                    console.log("DUMMY");
                  }
              }
            //PROCESS EVERYTHING OUT AS NEDED

          });
    }
    if (req.method=="GET"||req.method=="POST"){
      //get or post only, always check events
      console.log(filename);
      //register the different end points, this must be first
      if (filename=="./"||filename.includes("index")){
          filename = "./index.html";
      }
      //the event rule to remove extra and send to old
      if(filename.includes("event")){
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