// Test for message

const expect = require('expect');

var { generateMessage } = require('./message.js');


describe('Generate message', () => {

	it('Should generate correct message object', () => {
		var from = 'Kenobi';
		var text = 'Hello there!';
		var msg = generateMessage(from, text);
		
		expect(msg.createdAt).toBeAn('number');
		expect(msg).toInclude({ from, text });
	});

});
