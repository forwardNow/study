const UserModel = require('../models/user');

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
    const { body: user } = req;

    UserModel.findOne({
      $or: [
        { email: user.email },
        { nickname: user.nickname },
      ],
    }).then((data) => {
      // 不存在，允许注册
      if (!data) {
        return new UserModel(user).save();
      }

      // 邮箱已存在
      if (data.email === user.email) {
        return res.status(200).json({
          err_code: 1,
        });
      }
      // 昵称已存在
      if (data.nickname === user.nickname) {
        return res.status(200).json({
          err_code: 2,
        });
      }
      return null;
    }).then(() => {
      res.status(200).json({
        err_code: 0,
      });
    }).catch((err) => {
      console.log(err);
      res.status(200).json({
        err_code: 500,
      });
    });
  });
};
