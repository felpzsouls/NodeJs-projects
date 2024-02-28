const express = require('express'),
    app = express(),
    { createServer } = require('node:http'),
    server = createServer(app),
    { join } = require('node:path'),
    { Server } = require('socket.io'),
    io = new Server(server);


app.get('/', async (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {

    socket.broadcast.emit('Oi');
    socket.on('chat message', async(msg) => {
      io.emit('chat message', msg);
    })
    io.emit('chat message', 'seja bem vindo')
})

server.listen('80', () => console.log('site online na porta: http://localhost'))
