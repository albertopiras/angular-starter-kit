var _ = require('lodash');


const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
}
module.exports = {

  login: function (req, res) {
    var currentCredentials = req.body;

    if (_.isEqual(ADMIN_CREDENTIALS, currentCredentials)) {
      if (_.isEqual(SessionService.getSession(), {})) {
        SessionService.createSession();
        console.log(' new session: ', SessionService.getSession().sessionId);
      }
      res.set({ 'session-id': SessionService.getSession().sessionId });
      return res.ok(
        {
          data: {
            username: ADMIN_CREDENTIALS.username,
            user_role: 1
          }
        }
      );

    }
    else {
      /* wrong credentials */
      return res.badRequest(
        {
          error_code: 'wrong_credentials',
        }
      );
    }
  },

  logout: function (req, res) {
    if (req.headers['session-id'] !== SessionService.getSession().sessionId) {
      console.log('Session id are different : ', req.headers['session-id'], SessionService.getSession().sessionId);
      return res.forbidden(
        {
          error_code: 'session_expired',
        }
      );
    } else {
      SessionService.destroySession();
      if (typeof SessionService.getSession().sessionId === 'undefined') {
        console.log('logout Success on destroying session');
        return res.ok({ logout: true });
      } else {
        console.log('logout Fails on destroying session');
        return res.serverError({ logout: false, error_code: "server_session_errorr" });
      }
    }
  },

};
