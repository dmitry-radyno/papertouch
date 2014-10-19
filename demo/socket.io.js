var http = require('http');
var querystring = require('querystring');
module.exports = function(io){

    io.on('connection',function(socket){
        socket.on('clientMoveUp',function(){
            console.log('clientMoveUp');
            io.emit('moveUp');
        });

        socket.on('clientMoveRight',function(){
            console.log('clientMoveRight');
            io.emit('moveRight');
        });

        socket.on('clientMoveLeft',function(){
            console.log('clientMoveLeft');
            io.emit('moveLeft');
        });

        socket.on('clientMoveDown',function(){
            console.log('clientMoveDown');
            io.emit('moveDown');
        });

    });


}