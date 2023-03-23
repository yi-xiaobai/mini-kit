const FormData = require('form-data');
const MiniRequest = require('../toolkit/mini_request')

class OSS extends MiniRequest {
    constructor(options) {
        super()
        this.URL = options.URL
    }


    /**
     * 上传图片
     * @param {*} params 
     * @returns 
     */
    async upload(params) {
        const data = this.formatParams(params)
        let headers = {
            ...data.getHeaders()
        }
        const res = await this.doRequest(this.URL, 'POST', data, headers);
        headers = null
        return res
    }

    /**
     * 格式化参数
     * @param {*} params 
     */
    formatParams(params) {
        let data = new FormData();
        for (let key in params) {
            data.append(key, params[key])
        }
        return data
    }
}

module.exports = OSS