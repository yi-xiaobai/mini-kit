const {
    Image,
    createCanvas,
    loadImage,
    registerFont
} = require('canvas')
const path = require('path')

const fontPath = path.join(__dirname, "../", "font/AlibabaSans-Black.ttf")
// 加载字体
registerFont(fontPath, {
    family: 'Sans Black'
})

class Canvas {

    /**
     * 图片上写文字
     * @param {string} qrcodeUrl 
     * @param {string} keyWord 
     * @param {number} width 
     * @param {number} height 
     */
    drag(qrcodeUrl, keyWord, width = 256, height = 256) {
        return new Promise((resolve, reject) => {
            const canvas = createCanvas(width, height + 44);
            const ctx = canvas.getContext('2d');
            // 文字大小及字体
            ctx.font = "30px Sans Black";
            // 文字颜色
            ctx.fillStyle = "red"
            ctx.fillText(keyWord, 50, 290);

            const img = new Image();
            img.onload = () => {
                // 背景图像加载后画到canvas画布上
                ctx.drawImage(img, 0, 0, width, height);
                let dataUrl = canvas.toDataURL()
                resolve(dataUrl)
            }
            img.src = qrcodeUrl
        })

    }
}


module.exports = Canvas