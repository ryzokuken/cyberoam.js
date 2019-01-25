require('es6-promise').polyfill();
require('isomorphic-fetch');
const { parseString } = require("xml2js");

const defaults = require("./defaults.json");

function getErrorMessage(error) {
    if (error) {
        switch (error.code) {
            case "ENETUNREACH":
                return "You're not connected to a network. Check your connection and try again.";
            case "ETIMEDOUT":
                return "You're not connected to Cyberoam. Check your network and try again.";
            default:
                throw error;
        }
    }
}

class Cyberoam {
    constructor(options) {
        this.options = { ...defaults,
            ...options
        };
    }

    login(username, password) {
        const options = {
            ...this.options.commonOptions,
            method: "POST",
            url: this.options.loginURL,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            form: {
                mode: "191",
                username,
                password
            },
        };

        return new Promise((resolve, reject) => {
            fetch(options)
                .then(function(response) {
                    if (response.status>=400) {
                        return reject(response);
                    }
                    if (response.includes(this.options.loginMessage)) {
                        return resolve(response);
                    }
                    parseString(response, (err, result) => {
                        return reject(result.requestresponse.message[0]);
                    });
                });
        });
    }

    logout(username, password) {
        const options = {
            ...this.options.commonOptions,
            method: "POST",
            url: this.options.loginURL,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            form: {
                mode: "193",
                username
            },
        };

        return new Promise((resolve, reject) => {
            fetch(options)
                .then(function(response) {
                    if (response.status >= 400) {
                        return reject(response);
                    }
                    if (response.includes(this.options.logoutMessage)) {
                        return resolve(response);
                    }
                    reject(response);
                });
        });
    }

    checkLiveStatus(username) {
        const options = {
            ...this.options.commonOptions,
            method: "GET",
            url: this.options.liveURL,
            qs: {
                mode: "192",
                username
            },
        };

        return new Promise((resolve, reject) => {
            fetch(options)
                .then(function(response) {
                    if (response.status >= 400) {
                        return reject(response);
                    }
                    if (resolve.includes("ack")) {
                        return resolve();
                    }
                    return reject();
                });
        });
    }
}

module.exports = Cyberoam;
