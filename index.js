const request = require('request');
const { parseString } = require('xml2js');

const defaults = require('./defaults.json');

class Cyberoam {
  login(username, password) {
    const options = {
      method: 'POST',
      url: defaults.loginURL,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: { mode: '191', username, password }
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          throw new Error(error);
        }

        if (body.includes(defaults.loginMessage)) {
          resolve(body);
        } else {
          parseString(body, (err, result) => {
            reject(result.requestresponse.message[0]);
          });
        }
      });
    });
  }

  logout(username, password) {
    const options = {
      method: 'POST',
      url: defaults.loginURL,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: { mode: '193', username }
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          throw new Error(error);
        }

        if (body.includes(defaults.logoutMessage)) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  }

  checkLiveStatus(username) {
    const options = {
      method: 'GET',
      url: defaults.liveURL,
      qs: { mode: '192', username }
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) throw new Error(error);

        if (body.includes('ack')) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}

module.exports = Cyberoam;
