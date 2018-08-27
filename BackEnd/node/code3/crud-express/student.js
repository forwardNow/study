const fs = require('fs');
/**
 * 数据操作模块
 * 职责：操作文件的数据，只处理数据，不关心业务
 */

const dbPath = './db.json';


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
 * @param {number} id
 * @param {Function} callback
 */
exports.findById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const { students } = JSON.parse(data);
    const student = students.find(item => item.id === id);

    callback(null, student);
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

    newStudent.id = students[students.length - 1].id + 1;

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
exports.updateById = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return;
    }
    let { id } = student;
    const { students } = JSON.parse(data);

    id = parseInt(id, 10);

    const oldStu = students.find(item => item.id === id);

    Object.keys(student).forEach((key) => {
      oldStu[key] = student[key];
    });

    oldStu.id = id;

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
 * 删除学生
 */
exports.delete = () => {

};
