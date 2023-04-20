const MiniRequest = require("../toolkit/mini_request");

class OSS extends MiniRequest {
  constructor(options) {
    super();
    this.URL = options.URL;
  }

  /**
   * 上传图片
   * @param {Object} params
   * @param {Object} headers
   * @param {string} methods
   * @returns
   */
  async upload(params, headers, methods = "POST") {
    return await this.doRequest(this.URL, methods, params, headers);
  }
}

module.exports = OSS;
