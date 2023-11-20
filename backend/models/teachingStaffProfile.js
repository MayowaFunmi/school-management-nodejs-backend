const mongoose = require('mongoose');

const teachingStaffSchema = new mongoose.Schema({
    // bio data
    organizationUniqueId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Dr', 'Prof'],
        required: true
    },
    middleName: String,
    profilePicture: String,
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dateOfBirth: Date,
    age: Number,
    address: String,
    religion: {
        type: String,
        enum: ['Christianity', 'Islam', 'Others']
    },
    phoneNumber: String,
    aboutMe: String,

    // work related
    designation: {
        type: String,
        enum: ['Principal', 'Vice Principal', 'Head of Department', 'Class Teacher'],
        required: true,
    },

    gradeLevel: String,
    firstAppointment: Date,
    yearsInService: String,
    qualification: {
        type: String,
        enum: ['NCE', 'HND', 'B.Sc', 'PGDE', 'B.Arts', 'M.Sc', 'PhD'],
    },

    discipline: String,
    publishedWork: String,
    currentPostingZone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
    },
    currentPostingSchool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },
    previousSchools: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    }],
    currentSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    },
    otherSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    }],
}, { timestamps: true });

const TeachingStaff = mongoose.model('TeachingStaff', teachingStaffSchema);

module.exports = TeachingStaff;