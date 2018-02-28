// server.js

const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('New user connected');
	
	socket.emit('newMessage', generateMessage(
		'Admin', 'Welcome to the chat app'
	));

	socket.broadcast.emit('newMessage', generateMessage(
		'Admin', 'A new user joined',
	));

	socket.on('createMessage', (msg) => {
		console.log('Create message', msg);

		socket.broadcast.emit('newMessage', generateMessage(
			msg.from, msg.text,
		));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(PORT, () => {
	console.log(`Started on port ${PORT}`);
});
