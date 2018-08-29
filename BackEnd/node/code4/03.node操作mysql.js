const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'pkui',
});

// 1. 连接数据库（打开冰箱门）
connection.connect();

// 2. 操作数据（把大象放入冰箱）
connection.query('SELECT * FROM `sys_dept`', (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log('The solution is: ', results[0]);
});

// 关闭连接（关上冰箱门）
connection.end();
