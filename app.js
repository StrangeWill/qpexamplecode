var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, function() {
  console.log('listening');
});

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('update', function(data) {
    console.log(data);
    socket.emit('update', state);
  });
});

function loop() {
  var delta = Date.now() - last;
  var currentState = {
    time: Date.now(),
    loopDelta: delta
  };

  state = currentState;
  setTimeout(loop, 50);
}

var last = Date.now();
var state = { time: Date.now(), loopDelta: 0 };
setTimeout(loop, 50);


