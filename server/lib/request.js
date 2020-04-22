const Req = require('request');
const https = require('https');
const debug = require('debug')('chevy-billing-server');

const request = Req.defaults({
    forever: true,
    pool: {
        maxSockets: Infinity,

    },
    agent: https.agent,
    timeout: 10 * 1000
})

// const https = require('https');
// let pool = new https.Agent()
// pool.maxSockets = 1024
// const request = Req.defaults({
//     agent: pool
// })
// const request = Req;
class Request {

    constructor() {}

    _ajax(options) {
        return new Promise(function (resolve, reject) {
            let start = new Date().getTime();
            request(options, function (error, response, body) {
                let end = new Date().getTime();
                let cost = (end - start) / 1000;
                console.log('request[' + options.url + '] time: ', cost, 's');
                if (error) {
                    debug('error', error);
                    return reject(error)
                }
                return resolve(response)
            });
        });
    }
}

module.exports = Request;