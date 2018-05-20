// Testing
const expect = require('expect');

const { isRealString } = require('./validation.js');

describe('isRealString()', () => {
	
	it('Sould reject non-string values', () => {
		var name = 42;

		expect(isRealString(name)).toBeFalsy();
	});

	it('Should reject string with only spaces', () => {
		var name = '      ';

		expect(isRealString(name)).toBeFalsy();
	});

	it('Should allow string with non-space chars', () => {
		var name = ' 43 dd    ';

		expect(isRealString(name)).toBeTruthy();
	});

});
