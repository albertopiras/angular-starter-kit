var chance = require('chance').Chance();
var users = [];

userListSize = 30;

module.exports = {

  getUsers: function () {
    if (_.isEmpty(users)) {
      console.log('User list initializing');
      users = this.createUserList();
    }
    return users;
  },

  createUserList: function () {
    var newList = [];
    for (var i = 0; i < userListSize; i++) {
      let tempUser = {
        id: chance.guid(),
        name: chance.first(),
        surname: chance.last(),
        age: chance.age(),
        birthday: chance.birthday(),
        gender: chance.gender(),
        email: chance.email(),
        company: chance.company(),
        city: chance.city(),
        address: chance.address(),
        phone: chance.phone()
      }
      newList.push(tempUser);
    }

    return newList;
  },

  getUser: function (id) {
    return _.find(this.getUsers(), function (chr) {
      return chr.id === id;
    });
  }

};
