const http = require('https');
const cheerio = require('cheerio');

// 根据得到的数据，处理得到自己想要的
function getData(str) {
  // 沿用JQuery风格，定义$
  const $ = cheerio.load(str);
  // 获取的数据数组
  const html = $('.mainContent,.article-content').parent().html();

  // 返回出去
  return html;
}

module.exports = url => new Promise((resolve) => {
  http.get(url, (res) => {
    let str = '';
    // 绑定方法，获取网页数据
    res.on('data', (chunk) => {
      str += chunk;
    });
    // 数据获取完毕
    res.on('end', () => {
      // 调用下方的函数，得到返回值，即是我们想要的img的src
      const data = getData(str);
      resolve(data);
    });
  });
});
