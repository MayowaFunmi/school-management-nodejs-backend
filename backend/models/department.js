const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
}, { timestamps: true });

const Department = mongoose.model('Department', deptSchema);

module.exports = Department;