const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    uniqueId: {
        type: String,
        required: true,
        unique: true
    },

    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// method to generate a uniqueId
userSchema.statics.generateUniqueId = function () {
    const numbers = Math.floor(10000 + Math.random() * 90000);
    const letters = Math.random().toString(36).substring(0, 3).toUpperCase();
    return `${numbers}${letters}`;
}

const User = mongoose.model('User', userSchema);

module.exports = User;