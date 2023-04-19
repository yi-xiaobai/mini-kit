const fs = require("fs");
const FormData = require("form-data");
const MiniRequest = require("../toolkit/mini_request");

class OSS extends MiniRequest {
  constructor(options) {
    super();
    this.URL = options.URL;
  }

  /**
   * 上传图片
   * @param {*} fileName
   * @param {*} params
   * @returns
   */
  async upload(fileName, params) {
    const data = this.formatParams(this.mergeParams(fileName, params));
    let headers = {
      ...data.getHeaders(),
    };
    const res = await this.doRequest(this.URL, "POST", data, headers);
    headers = null;
    options = null;
    return res;
  }

  mergeParams(fileName, params) {
    const filePath = __dirname + "/" + fileName;
    const stats = fs.statSync(filePath);
    return {
      chunkNumber: 1,
      chunkSize: 1048576,
      currentChunkSize: stats.size,
      totalSize: stats.size,
      identifier: `${stats.size}-${fileName}`,
      filename: fileName,
      relativePath: fileName,
      totalChunks: 1,
      ...params,
    };
  }

  /**
   * 格式化参数
   * @param {*} params
   */
  formatParams(params) {
    let data = new FormData();
    for (let key in params) {
      data.append(key, params[key]);
    }
    return data;
  }
}

module.exports = OSS;
