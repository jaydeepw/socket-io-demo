var PORT_NO = 8888;
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

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

  socket.emit('news', { hello: 'world' });
  socket.emit('news', { hello2: 'Second object.' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

console.log('Socket server running on port: ' + PORT_NO);