var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use("/video", express.static(__dirname + '/video'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/demo", express.static(__dirname + '/demo'));

app.get('/detector', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/preview', function(req, res){
    res.sendFile(__dirname + '/preview.html');
});

io.on('connection', function(socket){
    socket.on('touch', function(data){
        console.log(data);
        socket.broadcast.emit("touch", data);
    });
});

http.listen(8081, function(){
  console.log('listening port 8080');
});