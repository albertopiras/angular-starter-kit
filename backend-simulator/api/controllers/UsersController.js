var chance = require('chance').Chance();
var _ = require('lodash');

module.exports = {

  list: function (req, res) {

    const error = chance.bool();
    var response =
      {
        "data": {
          "users": UsersService.getUsers()
        }
      }

    return res.ok(response);
  },

  getDetails: function (req, res) {
    console.log('param: %s', req.param('id'));
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
