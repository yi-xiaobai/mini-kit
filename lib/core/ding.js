const crypto = require("crypto");
const MiniRequest = require("../toolkit/mini_request");

class Ding extends MiniRequest {
  constructor(options) {
    super();
    this.SECRET = options.SECRET;
    this.TOKEN = options.TOKEN;
    this.DING_ROOT_URL = options.DING_ROOT_URL;
  }

  /**
   * 自定义机器人消息
   * @param {*} params
   * @returns
   */
  async customSendMsg(params) {
    const { timestamp, sign } = this.encrypt();
    const URL = `${this.DING_ROOT_URL}/robot/send?access_token=${this.TOKEN}&timestamp=${timestamp}&sign=${sign}`;
    let headers = {
      "Content-Type": "application/json",
    };
    const res = await this.doRequest(URL, "POST", params, headers);
    headers = null;
    return res;
  }

  /**
   * 加密
   * @returns
   */
  encrypt() {
    const timestamp = Date.now();
    const str = timestamp + "\n" + this.SECRET;

    const sign = crypto
      .createHmac("sha256", this.SECRET)
      .update(str)
      .digest("base64");
    const sign_encodeUrl = encodeURIComponent(sign);

    return {
      timestamp: timestamp,
      sign: sign_encodeUrl,
    };
  }
}

module.exports = Ding;
