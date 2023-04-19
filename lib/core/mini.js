const { minidev } = require("minidev");

class Mini {
  constructor(options) {
    this.KEY = options.KEY;
    this.TOOLID = options.TOOLID;
    this.auth();
  }

  /**
   * 授权
   */
  async auth() {
    await minidev.config.useRuntime({
      "alipay.authentication.privateKey": this.KEY,
      "alipay.authentication.toolId": this.TOOLID,
    });
  }

  /**
   * 生成二维码
   * @param {string} appId 小程序的 APPID
   * @param {string} project
   * @param {object} params
   */
  async preview(appId, project, params) {
    let param = {
      appId: appId,
      project: project,
    };
    Object.assign(param, params || {});

    const { qrcodeUrl, version } = await minidev.preview(param);
    param = null;
    return {
      qrcodeUrl,
      version,
    };
  }

  /**
   * 上传提审
   * @param {string} appId 小程序的 APPID
   * @param {string} project
   * @param {object} params
   */
  async upload(appId, project, params) {
    let param = {
      appId: appId,
      project: project,
    };
    Object.assign(param, params || {});

    const uploadResult = await minidev.upload(param, {
      onLog: (data) => {
        // 输出日志
        console.log(data);
      },
    });
    param = null;
    return uploadResult;
  }

  /**
   * 真机调试
   * @param {string} appId 小程序的 APPID
   * @param {string} project
   * @param {object} params
   */
  async remoteDebug(appId, project, params) {
    let param = {
      appId: appId,
      project: project,
    };
    Object.assign(param, params || {});

    const { qrcodeUrl, debugUrl } = await minidev.remoteDebug(param);
    param = null;

    return {
      qrcodeUrl, // 真机调试二维码图片地址
      debugUrl, // 可在浏览器中打开的调试器应用地址
    };
  }

  /**
   * 获取小程序列表
   * @param {Object} params
   * @returns
   */
  async getList(params = {}) {
    return await minidev.app.getList(params);
  }

  /**
   * 获取最新上传的版本号
   * @param {string} appId 小程序的 APPID
   * @param {Object} params
   * @returns
   * 返回值为小程序的最新上传版本，类型为字符串
   * 如果当前小程序从未上传过，返回 0.0.0
   */
  async getUploadedVersion(appId, params) {
    let param = {
      appId: appId,
    };
    Object.assign(param, params || {});

    const versionString = await minidev.app.getUploadedVersion(param);
    param = null;
    return versionString;
  }

  /**
   * 删除指定版本
   * @param {string} appId 小程序的 APPID
   * @param {string} version 目标版本号
   * @param {object} params
   * @returns
   */
  async deleteVersion(appId, version, params) {
    let param = {
      appId: appId,
      version: version,
    };
    Object.assign(param, params || {});

    await minidev.app.deleteVersion(param);
    param = null;
  }

  /**
   * 将小程序的某个版本设置为体验版
   * @param {string} appId 小程序的 APPID
   * @param {string} version 目标版本号
   * @param {object} params
   * @returns
   */
  async setExperience(appId, version, params) {
    let param = {
      appId: appId,
      version: version,
    };
    Object.assign(param, params || {});

    const { qrCodeUrl } = await minidev.app.setExperience(param);
    param = null;

    return {
      qrCodeUrl,
    };
  }

  /**
   * 取消体验版
   * @param {string} appId 小程序的 APPID
   * @param {string} version 目标版本号
   * @param {object} params
   * @returns
   */
  async cancelExperience(appId, version, params) {
    let param = {
      appId: appId,
      version: version,
    };
    Object.assign(param, params || {});

    await minidev.app.cancelExperience(param);
    param = null;
  }

  /**
   * 编译小程序
   * @param {string} project 小程序项目路径
   * @param {Object} params
   */
  static async build(project, params) {
    let param = {
      project: project,
    };
    Object.assign(param, params || {});
    const buildResult = await minidev.build(param);
    param = null;
    return buildResult;
  }
}

module.exports = Mini;
