var chance = require('chance').Chance();

module.exports = {

  status: function (req, res) {

    const error= chance.bool();
    var response = 
    {

        "status": chance.pick(['1','2','3','0']),
        "systemError": error
      
    }
    
    return res.ok(response);
  }

};
