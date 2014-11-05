var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use("/video", express.static(__dirname + '/video'));
app.use("/codebase", express.static(__dirname + '/codebase'));
app.use("/demo", express.static(__dirname + '/demo'));

app.get('/detector', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/preview', function(req, res){
    res.sendFile(__dirname + '/preview.html');
});
app.get('/emulate', function(req, res){
    res.sendFile(__dirname + '/emulate.html');
});

io.on('connection', function(socket){
    socket.on('touchstart', function(data){
        console.log("touchstart: ", data);
        socket.broadcast.emit("touchstart", data);
    });
    socket.on('touchend', function(data){
        socket.broadcast.emit("touchend", data);
    });
    socket.on('buttonDetected', function(data) {
        socket.broadcast.emit("buttonDetected", data);
    });
    socket.on('clear', function(data){
        socket.broadcast.emit("clear", data);
    });
});

http.listen(8080, function(){
  console.log('listening port 8080');
});