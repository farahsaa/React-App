const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.



//helper function to broadcast the data to all clients

wss.broadcast = (data) => {
  wss.clients.forEach(function (client){
    client.send(JSON.stringify(data))
  })
}

  //listening for message from client, change message type + id and send back the message

wss.on('connection', (ws) => {
//counts how many users are connected and broadcast to all clients

  wss.broadcast({type:'counter', data:  wss.clients.size})
  
  console.log('Client connected');
  
  ws.on('message',(data) =>{
    var data = JSON.parse(data)  
    if (data.type === "postMessage"){
      data.id= uuid.v4();
      data.type = "incomingMessage "
      wss.clients.forEach(function (client){
        client.send(JSON.stringify(data))
      })

     }
    else if (data.type === "postNotification"){
      data.id= uuid.v4();
      data.type = "incomingNotification"
      wss.clients.forEach(function (client){
        client.send(
          JSON.stringify(data)
          )
      })

     }
  
  });

 
  ws.on('close', () => {
    //sends updated number of clients after clients disconnect
    wss.broadcast({type:'counter', data:  wss.clients.size})
    console.log('Client disconnected');
  });
});
