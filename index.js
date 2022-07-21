const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('chat message', 'user connected', null);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat message', 'user disconnected', null);
    });
    socket.on('chat message', (msg, username) => {
        io.emit('chat message', msg, username);
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});