// index.js

var socket = io();

socket.on('connect', function () {

	socket.emit('getRooms', function(rooms) {
		console.log(rooms);


		//var template = $('#rooms-template').html();
		//for(var i in rooms){
			//var html = Mustache.render(template, {
				//name: rooms[i]
			//});
			//$('#rooms').append(html);
		//}

		$('#room').autocomplete({
			source: rooms
		});
	});

});
