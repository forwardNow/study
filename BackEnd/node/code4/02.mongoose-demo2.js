// 引入
const mongoose = require('mongoose');

// 结构（模型）
const { Schema } = mongoose;

// 1. 连接 MongoDB 数据库
// 连接的数据库不存在时，当往其插入一条数据时会自动创建
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// 2. 创建 Schema 实例：设计文档结构（表结构）
// 约束的目录：保证数据的完整性，不要有脏数据
const userSchema = new Schema({
  username: {
    type: String,
    index: true, // 索引
    unique: true, // 唯一性约束
    required: true, // 非空约束
  },
  password: {
    type: String,
    required: true, // 非空约束
    default: '123456', // 默认值约束
  },
  email: {
    type: String,
  },
});

// 3. 创建模型
// mongoose.model()
//   参数1：数据库名称。'User' => 数据库 users
//   参数2：Scheme 实例
//   返回值：模型构造函数
const User = mongoose.model('User', userSchema);

// 4. 操作模型

// 增加数据
// const admin = new User({
//   username: 'zhangsan',
//   password: '123456',
//   email: 'zhangsan@qq.com',
// });

// // 保存
// admin.save((err, ret) => {
//   if (err) {
//     console.log('保存失败');
//   } else {
//     console.log('保存成功');
//     console.log(ret);
//     /*
//     { password: '123456',
//       _id: 5b860c3e8371021ecb5dc29b,
//       username: 'admin',
//       email: 'admin@qq.com',
//       __v: 0 }
//     */
//   }
// });

// 查询所有
// User.find((err, ret) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(ret);
//   // [ {...}, {...} ]
// });

// 按条件查询所有
// User.find({
//   username: 'zhangsan',
// }, (err, ret) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(ret);
//   // [ {...} ]
// });


// // 按条件查询单条数据
// User.findOne({
//   username: 'zhangsan',
// }, (err, ret) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(ret);
//   // {...}
// });


User.updateOne({
  username: 'zhangsan', // where
}, {
  password: '123', // set
}, (err) => {
  if (err) {
    return console.log('更新失败');
  }
  return console.log('更新成功');
});
