// index.js

var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');

	//socket.emit('createEmail', {
		//to: 'k4t0mono@terminus.io',
		//text: 'Teste 23'
	//});

	socket.emit('createMessage', {
		to: 'user123',
		text: 'Aplha',
		createdAt: Date.now()
	});
});

socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

//socket.on('newEmail', function (email) { 
	//console.log('New email');
	//console.log(email);
//});

socket.on('newMessage', function (msg) {
	console.log(msg);
});
