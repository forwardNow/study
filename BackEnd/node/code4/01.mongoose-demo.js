// 引入
const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// 创建模型（设计数据库）
// MongoDB 是动态的，非常灵活，只需要在代码中设计数据库
// mongoose 使设计数据库更简单
// Cat 为集合（表）名，生成 cats 集合
// { name: String } 键（字段）
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
