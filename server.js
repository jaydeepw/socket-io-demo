var PORT_NO = 8888;
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app), 
    fs = require('fs'),
    express = require('express'),
    callCount = 0;

app.listen(PORT_NO);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  /*socket.emit('news', { hello: 'world' });
  socket.emit('news', { hello2: 'Second object.' });*/

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('jays_data', function (data) {
    console.log('callCount: ' + (++callCount) );
    console.log(data);
    socket.emit('call_count', 
        { 
          call_count: callCount,
          id: socket.id
      });
  });

});

//
console.log('Socket server running on port: ' + PORT_NO);
