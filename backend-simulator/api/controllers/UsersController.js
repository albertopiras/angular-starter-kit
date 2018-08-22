var chance = require('chance').Chance();
var _ = require('lodash');

module.exports = {

  list: function (req, res) {

    var totalUsers = UsersService.getUsers();
    var offset = req.param('offset');
    var pagesize = req.param('pagesize');

    var response =
      {
        "data": {
          "users": totalUsers.slice(offset, offset+pagesize),
          "total_items": UsersService.getUsers().length
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
