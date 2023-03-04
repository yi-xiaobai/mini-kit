const {
    minidev
} = require('minidev');

class Mini {
    constructor(options) {
        this.KEY = options.KEY
        this.TOOLID = options.TOOLID
    }

    /**
     * 授权
     */
    async auth() {
        await minidev.config.useRuntime({
            'alipay.authentication.privateKey': this.KEY,
            'alipay.authentication.toolId': this.TOOLID
        });
    }


    /**
     * 生成二维码
     * @param {string} appId 小程序Id
     * @param {string} project 项目路径
     * @param {object} params
     */
    async preview(appId, project, params) {
        let param = {
            appId: appId,
            project: project,
        };
        Object.assign(param, params || {});

        const {
            qrcodeUrl,
            version
        } = await minidev.preview(param);
        param = null;
        return {
            qrcodeUrl,
            version
        };
    }

    /**
     * 上传提审
     * @param {string} appId 小程序Id
     * @param {string} project 项目路径
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
            }
        });
        param = null;
        // 打印上传版本
        console.log(uploadResult.version);
    }


    /**
     * 编译小程序
     * @param {string} project 小程序项目路径
     * @param {Object} params 
     */
    async build(project, params) {
        let param = {
            project: project,
        };
        Object.assign(param, params || {});
        const buildResult = await minidev.build(param)
        param = null;
        return buildResult
    }


    /**
     * 真机调试
     * @param {string} appId 小程序Id
     * @param {string} project 项目路径
     * @param {object} params
     */
    async remoteDebug(appId, project, params) {
        let param = {
            appId: appId,
            project: project,
        };
        Object.assign(param, params || {});

        const {
            qrcodeUrl,
            debugUrl
        } = await minidev.remoteDebug(param)
        param = null;

        return {
            qrcodeUrl, // 真机调试二维码图片地址
            debugUrl, // 可在浏览器中打开的调试器应用地址
        }
    }
}

module.exports = Mini