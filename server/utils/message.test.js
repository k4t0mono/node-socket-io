// Test for message

const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message.js');


describe('Generate message', () => {

	it('Should generate correct message object', () => {
		var from = 'Kenobi';
		var text = 'Hello there!';
		var msg = generateMessage(from, text);
		
		expect(msg.createdAt).toBeAn('number');
		expect(msg).toInclude({ from, text });
	});

});

describe('generateLocationMessage()', () => {
	
	it('Should generate correct location object', () => {
		var lat = -1.234567;
		var lon = 7.654321;
		var from = 'admin';
		var msg = generateLocationMessage(from, lat, lon);
		var url = `https://www.google.com/maps?q=${lat},${lon}`;

		expect(msg.createdAt).toBeA('number');
		expect(msg).toInclude({ from, url });
	});

});
