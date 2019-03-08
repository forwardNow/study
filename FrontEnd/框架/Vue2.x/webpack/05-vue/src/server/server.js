// 1.引入
const express = require('express');

// 2.创建服务（相对于 http.createServer）
const app = express();

// allow custom header and CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.send(200); // 让 options 请求快速返回
  } else {
    next();
  }
});


// 3.处理请求
app.get('/', (req, res) => {
  res.send('这是 node.js 服务端。');
});

// 提供静态资源服务（公开指定目录）
app.use('/static/', express.static('./static/'));

// 轮播
app.get('/api/carousel', (req, res) => {
  res.status(200).json({
    errorCode: 0,
    reason: '处理成功',
    result: {
      items: [
        { url: 'http://www.baidu.com#1', img: 'http://localhost:3000/static/img/carousel/1.jpg' },
        { url: 'http://www.baidu.com#2', img: 'http://localhost:3000/static/img/carousel/2.jpg' },
        { url: 'http://www.baidu.com#3', img: 'http://localhost:3000/static/img/carousel/3.jpg' },
      ],
    },
  });
});

// 新闻列表
app.get('/api/newslist', (req, res) => {
  res.status(200).json({
    errorCode: 0,
    reason: '处理成功',
    result: {
      items: [
        {
          // https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_8494755788591494469%22%7D&n_type=0&p_from=1
          id: 1,
          title: '栗战书：2019年全国人大将落实制定房地产税法',
          add_time: '2019-03-01T04:05:34.000Z',
          brief: '“集中力量落实好党中央确立的重大立法事项，包括审议民法典，制定房地产税法等”立法调研、起草，加紧工作，确保如期完成。',
          click: 1,
          img_url: 'http://localhost:3000/static/img/newslist/1.jpg',
        },
        {
          // https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9289303083319564172%22%7D&n_type=0&p_from=1
          id: 2,
          title: '阿里回应马云退出传闻：马云从未转让和退出阿里股份',
          add_time: '2019-03-02T04:15:24.000Z',
          brief: '新浪科技讯 3月8日晚间消息，据天眼查数据显示，马云于3月7日退出了阿里旗下5家公司',
          click: 2,
          img_url: 'http://localhost:3000/static/img/newslist/2.jpg',
        },
        {
          // https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9384028750302744911%22%7D&n_type=0&p_from=1
          id: 3,
          title: '第八批游戏版号下发：腾讯一款、网易两款',
          add_time: '2019-03-03T14:15:24.000Z',
          brief: '新浪科技讯 3月8日下午消息，原国家新闻出版广电总局官方显示，第八批获批的游戏名单下发，共计95款游戏获批，审批时间为2月28日。',
          click: 3,
          img_url: 'http://localhost:3000/static/img/newslist/3.jpg',
        },
        {
          // https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9391143269029329141%22%7D&n_type=0&p_from=1
          id: 4,
          title: '丽水市委书记胡海峰向全市妇女致以节日祝贺和美好祝福',
          add_time: '2019-03-04T14:15:24.000Z',
          brief: '在“三八”国际劳动妇女节到来之际，在京出席十三届全国人大二次会议的丽水市委书记胡海峰，今天（3月8日）就市妇联组织全市广大妇女开展“弘扬践行‘浙西南革命精神’、勇担‘丽水之干’巾帼先行”主题实践活动作出重要批示。',
          click: 4,
          img_url: 'http://localhost:3000/static/img/newslist/4.jpg',
        },
      ],
    },
  });
});


// 4.监听端口（相对于 server.listen）
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
