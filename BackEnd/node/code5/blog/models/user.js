const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    // 默认值传入一个函数，当需要默认值时才会执行并获取值
    default: Date.now,
  },
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png',
  },
  bio: {
    type: String,
    default: '',
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
