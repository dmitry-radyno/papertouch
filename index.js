var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use("/video", express.static(__dirname + '/video'));
app.use("/scripts", express.static(__dirname + '/scripts'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/preview', function(req, res){
    res.sendFile(__dirname + '/preview.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('video', function(imageData){
        socket.broadcast.emit("video", imageData);
    });
});

http.listen(8080, function(){
  console.log('listening port 8080');
});