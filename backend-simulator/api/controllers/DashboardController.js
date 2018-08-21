var chance = require('chance').Chance();

module.exports = {

  statistics: function (req, res) {

    const error = chance.bool();
    var response =
      {
        "data": {
          "status": chance.pick(['1', '2', '3', '0']),
          "sales": {
            "list": [
              { data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000)), label: 'Samsung Gs9' },
              { data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000)), label: 'iPhone X' }
            ],
            "totals": {
              "apple":  Math.floor(Math.random() *2000),
              "samsung":  Math.floor(Math.random() *2000),
            }
          }
        }
      }

    return res.ok(response);
  }

};
