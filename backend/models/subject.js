const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
}, { timestamps: true });

const Subject = mongoose.model('Student', subjectSchema);

module.exports = Subject;