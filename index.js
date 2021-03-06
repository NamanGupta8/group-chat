const express = require('express');
const socket = require('socket.io')
//App setup
const app = express();
const server = app.listen(4000, ()=> {
    console.log('listening to 4000')
})

//Static files
app.use(express.static('public'))


const io = socket(server);
io.on('connection', (socket)=> {
    console.log('made socket connection', socket.id);

    socket.on('chat', (data)=> {
        // sendong data back to all sockets
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=> {
        socket.broadcast.emit('typing', data);
    })
})