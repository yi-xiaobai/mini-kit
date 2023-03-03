const Request = require('./request')

class Mini_Request extends Request {
    constructor() {
        super()
    }

    /**
     * 请求
     * @param {*} url 
     * @param {*} method 
     * @param {*} data 
     * @param {*} header 
     * @returns 
     */
    async doRequest(url, method, data, header) {
        if (method === 'GET') {
            if (data) {
                let query = [];
                for (let key of Object.keys(data)) {
                    query.push(`${key}=${data[key]}`);
                }
                url = url + '?' + query.join('&');
            }
            data = true;
        }

        let headers = {
            'Content-Type': 'application/json'
        }
        Object.assign(headers, header || {});
        let options = {
            url: `${url}`,
            method: method,
            headers: headers,
            json: data
        }
        let res = await this._ajax(options);
        return res.body;
    }

}

module.exports = Mini_Request