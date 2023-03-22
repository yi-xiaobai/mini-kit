const {
    Image,
    createCanvas,
} = require('canvas')

class Canvas {

    /**
     * 图片上写文字
     * @param {string} qrcodeUrl 
     * @param {string} keyWord 
     * @param {number} width 
     * @param {number} height 
     */
    drag(qrcodeUrl, keyWord, width = 256, height = 256) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            ctx.font = '40px Arial'
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'red';
            ctx.fillText(keyWord, canvas.width / 2, canvas.height / 2);
        }
        img.src = qrcodeUrl
        return canvas.toDataURL("image/png")
    }
}


module.exports = Canvas