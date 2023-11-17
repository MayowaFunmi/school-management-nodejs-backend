const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    level: {
        type: String, required: true
    }
}, { timestamps: true });

const StudentLevel = mongoose.model('StudentLevel', levelSchema);

module.exports = StudentLevel;