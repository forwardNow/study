const utils = require('utility');
const UserModel = require('../models/user');

const { md5 } = utils;

module.exports = (router) => {
  // 登陆页
  router.get('/login', (req, res) => {
    res.render('login.html');
  });

  // 处理登陆
  router.post('/login', (req, res, next) => {
    const { body: user } = req;
    UserModel.findOne({
      email: user.email,
      password: md5(`${md5(user.password)}wahh`),
    }).then((data) => {
      // 不存在
      if (!data) {
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid.',
        });
      }

      // 存在
      req.session.user = data;

      return res.status(200).json({
        err_code: 0,
        message: 'OK',
      });
    }).catch((err) => {
      // 处理异常
      next(err);
    });
  });

  // 注册页
  router.get('/register', (req, res) => {
    res.render('register.html');
  });

  // 处理注册
  router.post('/register', (req, res, next) => {
    const { body: user } = req;

    UserModel.findOne({
      $or: [
        { email: user.email },
        { nickname: user.nickname },
      ],
    }).then((data) => {
      // 邮箱已存在
      if (data && data.email === user.email) {
        return res.status(200).json({
          err_code: 1,
        });
      }
      // 昵称已存在
      if (data && data.nickname === user.nickname) {
        return res.status(200).json({
          err_code: 2,
        });
      }

      // 邮箱、昵称都不存在，允许注册
      let { password } = user;
      // 密码加密
      password = md5(`${md5(password)}wahh`);
      user.password = password;

      return new UserModel(user).save();
    }).then(() => {
      // 存入 session
      req.session.user = user;

      res.status(200).json({
        err_code: 0,
      });
    }).catch((err) => {
      next(err);
    });
  });

  // 退出
  router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
  });
};
