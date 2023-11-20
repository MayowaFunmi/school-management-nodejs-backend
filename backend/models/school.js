const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  organizationUniqueId: {
    type: String,
    required: true
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);

module.exports = School;
