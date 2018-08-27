const fs = require('fs');
/**
 * 数据操作模块
 * 职责：操作文件的数据，只处理数据，不关心业务
 */

const dbPath = './db.json';

let count = 0;

/**
 * 获取所有学生
 * @param callback {function} callback(err, data)
 */
exports.findAll = (callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const { students } = JSON.parse(data);
    callback(null, students);
  });
};

/**
 * 添加学生
 * @param stduent {object}
 */
exports.save = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return;
    }
    const { students } = JSON.parse(data);
    const newStudent = student;

    newStudent.id = count;

    count += 1;

    students.push(newStudent);

    fs.writeFile(dbPath, JSON.stringify({ students }), (err2) => {
      if (err2) {
        callback(err2);
        return;
      }
      callback(null);
    });
  });
};

/**
 * 更新学生
 */
exports.update = () => {

};

/**
 * 删除学生
 */
exports.delete = () => {

};
