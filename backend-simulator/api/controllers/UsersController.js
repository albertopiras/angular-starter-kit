var chance = require('chance').Chance();
var _ = require('lodash');

module.exports = {

  list: function (req, res) {

    var totalUsers = UsersService.getUsers();
    var offset = req.param('offset');
    var pagesize = req.param('pagesize');
    var name = req.param('name');
    var gender = req.param('gender');
    console.log(name);
    console.log(gender);

    tempUsersResponse = totalUsers.slice();
    if (name) {
      tempUsersResponse = _.filter(tempUsersResponse, function (item) {
        console.log(item.name);
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
    }
    if (gender) {
      var tempUsersResponse = _.filter(tempUsersResponse, function (item) {
        return item.gender === gender;
      });
    }

    var response =
      {
        "data": {
          "users": tempUsersResponse.slice(offset, offset + pagesize),
          "total_items": tempUsersResponse.length
        }
      }

    return res.ok(response);
  },

  getDetails: function (req, res) {
    var tempUser = UsersService.getUser(req.param('id'));
    var response =
      {
        "data": {
          "user": tempUser
        }
      }

    return res.ok(response);
  }

};
