const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
}, { timestamps: true });

const StudentClass = mongoose.model('StudentClass', classSchema);

module.exports = StudentClass;