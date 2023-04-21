const Mini = require("./mini");
const Ding = require("./ding");
const Oss = require("./oss");
class Deploy {
  constructor(options) {
    // 小程序应用id
    this.APPID = options.APPID;
    // 小程序项目路径 不传默认当前路径
    this.PROJECT = options.PROJECT || process.cwd();

    this.mini = new Mini(options);
    this.ding = new Ding(options);
    this.oss = new Oss(options);

    this.text = "";
  }

  before(mobiles) {
    let i = 0;
    while (i < mobiles.length) {
      this.text += `@${mobiles[i++]} `;
    }
  }

  after() {
    // 发送钉钉消息
    this.ding.customSendMsg(this.dParams);
  }

  setDingParams(type, params, other = {}) {
    this.dParams = {
      msgtype: type,
      [`${type}`]: params,
      at: {
        ...other,
      },
    };
  }

  /**
   * 测试自动化
   * @param {*} mobiles
   * @param {*} params
   */
  async uat(mobiles = [], params) {
    this.before(mobiles);

    let content = null;
    try {
      const { qrcodeUrl, version } = await this.mini.preview(
        this.APPID,
        this.PROJECT,
        params
      );
      content = {
        title: "请测试大佬们验证",
        text: `${this.text}\n ![111](${qrcodeUrl})`,
      };
    } catch (error) {
      content = {
        title: "生成二维码失败",
        text: `@${mobiles[0]} **生成二维码失败** \n > 问题原因：**${
          error && error.message
        }**`,
      };
    } finally {
      let other = {
        atMobiles: mobiles,
      };
      this.setDingParams("markdown", content, other);
      this.after();
    }
  }

  /**
   * 生产自动化
   * @param {*} mobiles
   * @param {*} params
   */
  async prod(mobiles, params) {
    this.before(mobiles);

    let content = null;
    try {
      await this.mini.upload(this.APPID, this.PROJECT, params);
      content = {
        content: `${this.text} 生产-上传成功-请生成体验版`,
      };
    } catch (error) {
      content = {
        content: `@${mobiles[0]} **生产-上传失败** \n 问题原因：**${
          error && error.message
        }**`,
      };
    } finally {
      let other = {
        atMobiles: mobiles,
      };
      this.setDingParams("text", content, other);
      this.after();
    }
  }
}

module.exports = Deploy;
