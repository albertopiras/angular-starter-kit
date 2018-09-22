var _ = require('lodash');

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
}
const https = require('https');
var timeout;

module.exports = {

  login: function (req, res) {
    var currentCredentials = req.body;

    /*** uncomment this if the hosting server falls asleep after X minutes of inactivity **/
    // try {
    //   var address = "https://" + req.host;
    //   stayAwakePlz(address);
    // } catch (err) {
    //   console.log('error in stayAwakePlz');
    // }

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


// This method allows the program to make a get request to the server where it is hosted, to awoid sleeping.
function stayAwakePlz(urlParam) {

  if (!timeout) {
    console.log('doing stayAwakePlz ' + urlParam);

    https.get(urlParam, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', (res) => {
        console.log('stayAwakePlz success');
      });
    }).on("error", (err) => {
      console.log('stayAwakePlz error');
    });
    setTimeout(() => {
      stayAwakePlz(urlParam);
    }, 1000 * 60 * 30);
  }
}