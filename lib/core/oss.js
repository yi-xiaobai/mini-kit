const MiniRequest = require("../toolkit/mini_request");

class OSS extends MiniRequest {
  constructor(options) {
    super();
    this.OSS_ROOT_URL = options.OSS_ROOT_URL;
  }

  /**
   * 上传图片
   * @param {Object} params
   * @param {Object} headers
   * @returns
   */
  async upload(params, headers) {
    return await this.doRequest(this.OSS_ROOT_URL, "POST", params, headers);
  }
}

module.exports = OSS;
