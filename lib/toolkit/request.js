const axios = require('axios')

class Request {
    constructor() {

    }

    _ajax(params) {
        return new Promise(function (resolve, reject) {
            let start = new Date().getTime();
            const requestparams = {
                method: params.method || 'get',
                timeout: params['timeout'] || 1000 * 30, // 添加超时时间 30秒
                url: params.url,
                data: params.json || params.data,
                responseType: params.responseType || 'json',
                headers: params.headers,
            };

            // get不要发送data
            if (requestparams.method.toLowerCase() == 'get') {
                delete requestparams.data;
            }
            axios(requestparams).then(function (response) {
                let end = new Date().getTime();
                let cost = (end - start) / 1000;
                // debug('request[' + params.url + '] time: ', cost, 's');
                console.log('request[' + params.url + '] time: ', cost, 's');
                //兼容老的request的响应
                response.body = response.data;
                response.statusCode = response.status;

                return resolve(response)
            }).catch(function (error) {
                console.log('error', requestparams, error);
                return reject(error.message || error)
            })
        });
    }
}

module.exports = Request