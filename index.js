var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //This makes sure the messages are sent out to everyone
  /*
  io.emit('some event', { for: 'everyone' });
  */

  //The message excludes a certain socket
  io.on('connection', function(socket){
    socket.broadcast.emit('hi');
  });

  //Message is sent to everyone yourself included
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });

});

http.listen(3000, function(){
  console.log('Yo Shihab Im here listening on *:3000');
});
