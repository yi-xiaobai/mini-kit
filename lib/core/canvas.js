const fs = require("fs");
const path = require("path");

const { Image, createCanvas, registerFont } = require("canvas");
const fontPath = path.join(__dirname, "../", "font/AlibabaSans-Black.ttf");
// 加载字体
registerFont(fontPath, {
  family: "Sans Black",
});

class Canvas {
  /**
   * 图片上写文字
   * @param {string} qrcodeUrl 图片链接
   * @param {string} keyWord 关键字
   * @param {string} fileName 文件名
   * @param {number} width  图片宽度
   * @param {number} height 图片高度
   * @param {number} positionX  文字定位x坐标
   * @param {number} positionY 文字定位y坐标
   */
  drag(
    qrcodeUrl,
    keyWord,
    fileName = "canvas.png",
    width = 256,
    height = 300,
    positionX,
    positionY
  ) {
    if (!qrcodeUrl || !keyWord) {
      return;
    }

    return new Promise((resolve, reject) => {
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");
      // 文字大小及字体
      ctx.font = "30px Sans Black";

      // 计算文字宽度 要在设置字体之后
      const textWidth = ctx.measureText(keyWord).width;
      const canvasWidth = canvas.width;
      const canvasHight = canvas.height;
      if (positionX < 0) {
        positionX = (canvasWidth - textWidth) / 2;
      }

      if (positionY < 0) {
        positionY = canvasHight - 10;
      }

      // 文字颜色
      ctx.fillStyle = "red";
      // 画布添加文字
      ctx.fillText(keyWord, positionX, positionY);

      const img = new Image();

      // 图片加载
      img.onload = () => {
        // 背景图像加载后画到canvas画布上
        ctx.drawImage(img, 0, 0, width, height);
        const stream = canvas.createPNGStream();
        const out = fs.createWriteStream(process.cwd() + `/${fileName}`);
        stream.pipe(out);
        out.on("finish", () => console.log("The PNG file was created."));
        resolve({
          errcode: 0,
        });
      };

      // 图片错误
      img.onerror = (err) => {
        console.error("==>Get img onerror", err);
        reject(err);
      };
      img.src = qrcodeUrl;
    });
  }
}

module.exports = Canvas;
