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
        console.log('==>Get this.KEY', this.KEY);
        console.log('==>Get this.TOOLID', this.TOOLID);
        await minidev.config.useRuntime({
            'alipay.authentication.privateKey': this.KEY,
            'alipay.authentication.toolId': this.TOOLID
        });
        console.log('授权完毕');
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
}

module.exports = Mini