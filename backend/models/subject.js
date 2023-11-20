const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    organizationUniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String, required: true
    }
}, { timestamps: true });

const Subject = mongoose.model('Student', subjectSchema);

module.exports = Subject;