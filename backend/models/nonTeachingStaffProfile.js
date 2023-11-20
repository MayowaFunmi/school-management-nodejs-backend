const mongoose = require('mongoose');

const nonTeachingStaffSchema = new mongoose.Schema({
  // General data
  organizationUniqueId: {
    type: String,
    required: true
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    enum: ['Mr', 'Miss', 'Mrs'],
    required: true,
  },
  middleName: String,
  picture: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  dateOfBirth: Date,
  age: Number,
  address: String,
  religion: {
    type: String,
    enum: ['Christianity', 'Islam', 'Others'],
  },
  phoneNumber: String,
  aboutMe: String,

  // Work-related info
  designation: {
    type: String,
    enum: ['Office Assistant', 'Secretary', 'Librarian', 'Others'],
    required: true,
  },
  gradeLevel: String,
  firstAppointment: Date,
  yearsInService: String,
  qualification: {
    type: String,
    enum: ['SSCE', 'OND', 'HND', 'PGDE', 'B.Sc', 'B.Arts'],
  },
  discipline: String,
  currentPostingZone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
  },
  currentPostingSchool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  previousPostings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  }]
}, { timestamps: true });

const NonTeachingStaff = mongoose.model('NonTeachingStaff', nonTeachingStaffSchema);

module.exports = NonTeachingStaff;
