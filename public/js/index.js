// index.js

var socket = io();


socket.on('connect', function () {
	console.log('Connected to server');
});


socket.on('disconnect', function () {
	console.log('Disconnect from server');
});


socket.on('newMessage', function (msg) {
	console.log('New message', msg);

	var li = $('<li></li>');
	li.text(`${msg.from}: ${msg.text}`);
	$('#msgs').append(li);
});


socket.on('newLocationMessage', function(msg) {
	var li = $('<li></li>');
	var a = $('<a target="_blanck">My current location</a>');

	li.text(`${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);

	$('#msgs').append(li);
});

$('#msg-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function () { });
});


$('#send-geo').click(function() {
	if(!navigator.geolocation) { return alert('Geolocation not suported'); }

	navigator.geolocation.getCurrentPosition(function(pos) {
		socket.emit('createLocationMessage', {
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude
		});

	}, function(err) {
		alert('Unable to fetch location.');
		console.log(err);
	});
});
