var chance = require('chance').Chance();

module.exports = {

  statistics: function (req, res) {

    const error = chance.bool();
    var response =
      {
        "data": {
          "status": chance.pick(['1', '2', '3', '0']),
          "total_cars": 147440,
          "failed_cars": 129941
        }
      }

    return res.ok(response);
  }

};
