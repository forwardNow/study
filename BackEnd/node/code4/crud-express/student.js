const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  age: {
    type: Number,
  },
  hobbies: {
    type: String,
  },
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;
