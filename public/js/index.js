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

	var li = $('<li></li>');
	li.text(`${msg.from}: ${msg.text}`);
	$('#msgs').append(li);
});

$('#msg-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function () { });
});
