const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // General data
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  middleName: String,
  admissionYear: String,
  currentSchool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    verboseName: 'Name of current school',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentClass',
    verboseName: 'Class',
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentLevel',
  },
  prevSchools: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  }],
  picture: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: Date,
  age: Number,
  address: String,
  religion: {
    type: String,
    enum: ['Christianity', 'Islam', 'Others'],
  },
  studentPhoneNumber: String,
  fatherName: String,
  fatherPhone: String,
  fatherImg: String,
  motherName: String,
  motherPhone: String,
  motherImg: String,
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
