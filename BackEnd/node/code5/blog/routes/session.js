module.exports = (router) => {
  // 登陆页
  router.get('/login', (req, res) => {
    res.render('login.html');
  });

  // 处理登陆
  router.post('/login', (req, res) => {
    res.redirect('/');
  });

  // 注册页
  router.get('/register', (req, res) => {
    res.render('register.html');
  });

  // 处理注册
  router.post('/register', (req, res) => {
    const { body } = req;
    console.log(body);
    res.send({
      err_code: 0,
    });
  });
};
