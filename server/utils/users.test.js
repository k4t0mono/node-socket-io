// Test for user

const expect = require('expect');

const { Users } = require('./users.js');

describe('Users', () => {
	
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{ id: '1', name: 'Raven', room: 'KotOR' },
			{ id: '2', name: 'Malak', room: 'KotOR' },
			{ id: '3', name: 'Vader', room: 'Galatic Empire' }
		];
	});

	it('Should add a new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'KatoMono',
			room: 'Chapa\'ai'
		};

		var response = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Sould return names for KotOR', () => {
		var userList = users.getUserList('KotOR');

		expect(userList).toEqual(['Raven', 'Malak']);
	});

	it('Sould return empty array', () => {
		var userList = users.getUserList('Fenix');

		expect(userList).toEqual([]);
	});
	
	it('Should find user', () => {
		expect(users.getUser('1')).toEqual(users.users[0])
	});

	it('Should not find user', () => {
		expect(users.getUser('fenix')).toNotExist();
	});

	it('Sould delete user', () => {
		var user = users.removeUser('1');

		expect(user.id).toBe('1');
		expect(users.users.length).toBe(2);
	});

	it('Sould not delete user', () => {
		var user = users.removeUser('fenix');

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

});
