var chance = require('chance').Chance();
var BACKEND_SESSION = {};

module.exports = {

  isAuthenticated: function () {
    return typeof BACKEND_SESSION.sessionId !== 'undefined';
  },

  getSession: function () {
    return BACKEND_SESSION;
  },

  setSessionProperty: function (key, value) {
    BACKEND_SESSION[key] = value;
  },

  createSession: function () {
    // get unique ID
    this.setSessionProperty('sessionId', chance.guid());
    return this.getSession();
  },

  destroySession: function () {
    BACKEND_SESSION = {};
  },

};
