const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    organizationUniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String, required: true
    }
}, { timestamps: true });

const StudentClass = mongoose.model('StudentClass', classSchema);

module.exports = StudentClass;