// index.js

var socket = io();


socket.on('connect', function () {
	console.log('Connected to server');
});


socket.on('disconnect', function () {
	console.log('Disconnect from server');
});


socket.on('newMessage', function (msg) {
	var ft = moment(msg.createdAt).format('HH:mm');
	var li = $('<li></li>');

	li.text(`[${ ft }] ${ msg.from }: ${ msg.text }`);
	$('#msgs').append(li);
});


socket.on('newLocationMessage', function(msg) {
	var ft = moment(msg.createdAt).format('HH:mm');
	var li = $('<li></li>');
	var a = $('<a target="_blanck">My current location</a>');

	li.text(`[${ ft }] ${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);

	$('#msgs').append(li);
});

$('#msg-form').on('submit', function(e) {
	e.preventDefault();

	var textBox = $('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: textBox.val()
	}, function () {
		textBox.val('');
	});
});


var send_geo = $('#send-geo');
$('#send-geo').click(function() {
	if(!navigator.geolocation) { return alert('Geolocation not suported'); }
	
	$(this).prop('disabled', true).text('Sending ...');

	navigator.geolocation.getCurrentPosition(function(pos) {
		send_geo.prop('disabled', false).text('Send Location');

		socket.emit('createLocationMessage', {
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude
		});

	}, function(err) {
		send_geo.prop('disabled', false).text('Sendo Location');

		alert('Unable to fetch location.');
		console.log(err);
	});
});
