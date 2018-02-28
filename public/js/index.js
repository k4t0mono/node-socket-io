// index.js

var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

socket.on('newMessage', function (msg) {
	console.log(msg);
});

socket.emit(
	'createMessage',
	{ from: 'DeepWeb', text: 'Hoi' },
	function(data) {
		console.log('Gotta this:', data);
	}
);
