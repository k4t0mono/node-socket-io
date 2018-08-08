// user class

class Users {
	constructor() {
		this.rooms = [];
	}

	addUser(id, name, room) {
		var user = { id, name, room };

		if(!this.rooms[room]) this.rooms[room] = []

		this.rooms[room].push(user);

		return user;
	}

	removeUser(id) {
		var user = this.getUser(id);
		if(user) {
			for(var k in this.rooms) {
				this.rooms[k] = this.rooms[k].filter((u) => u.id !== user.id);
			}
		}

		return user;
	}

	getUser(id) {
		for(var k in this.rooms) {
			var u = this.rooms[k].filter((u) => u.id === id);

			if(u[0]) return u[0];
		}

		return ;
	}

	getUserList(room) {
		var rooms = this.rooms[room];
		if(!rooms) return [];

		var nameArray = rooms.map((user) => user.name);

		return nameArray;
	}

	getRoomList() {
		return Object.keys(this.rooms);
	}
}

module.exports = { Users };
