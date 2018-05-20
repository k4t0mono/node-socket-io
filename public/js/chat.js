// index.js

var socket = io();


function scrollToBotoom() {
	var messages = $('#msgs');
	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}


socket.on('connect', function () {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';		

		} else {
			console.log('No err');
		}
	});
});


socket.on('disconnect', function () {
	console.log('Disconnect from server');
});


socket.on('updateUserList', function(users) {
	var ul = $('<ul></ul>');

	users.forEach(function(u) {
		ul.append($('<li></li>').text(u));
	});

	$('#users').html(ul);
});


socket.on('newMessage', function (msg) {
	var ft = moment(msg.createdAt).format('HH:mm');

	var template = $('#msg-template').html();
	var html = Mustache.render(template, {
		text: msg.from,
		from: msg.text,
		createdAt: ft
	});
	$('#msgs').append(html);

	scrollToBotoom();
});


socket.on('newLocationMessage', function(msg) {
	var ft = moment(msg.createdAt).format('HH:mm');

	var template = $('#locat-msg-template').html();
	var html = Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: ft
	});
	$('#msgs').append(html);

	scrollToBotoom();
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
