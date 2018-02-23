// server.js

const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('New user connected');
	
	//socket.emit('newEmail', {
		//from: 'email0@terminus.io',
		//text: 'Email test',
		//createdAt: Date.now()
	//});
	
	socket.emit('newMessage', {
		from: 'user123',
		text: 'The unicorn invasion of Dundee',
		createdAt: Date.now()
	});
	
	socket.on('createMessage', (msg) => {
		console.log(msg);
	});

	//socket.on('createEmail', (newEmail) => {
		//console.log('created email', newEmail);
	//});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(PORT, () => {
	console.log(`Started on port ${PORT}`);
});
