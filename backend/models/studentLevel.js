const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    organizationUniqueId: {
        type: String,
        required: true
    },
    level: {
        type: String, required: true
    }
}, { timestamps: true });

const StudentLevel = mongoose.model('StudentLevel', levelSchema);

module.exports = StudentLevel;