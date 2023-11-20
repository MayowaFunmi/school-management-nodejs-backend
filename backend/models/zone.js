const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    organizationUniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String, required: true
    }
}, { timestamps: true });

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;