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
    const letters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'; // Omitted 'O'
    const numbers = '123456789'; // Omitted '0'

    let result = '';

    // Generate 5 random letters
    for (let i = 0; i < 5; i++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        result += randomLetter;
    }

    // Generate 3 random numbers
    for (let i = 0; i < 3; i++) {
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        result += randomNumber;
    }

    return result;
}

const User = mongoose.model('User', userSchema);

module.exports = User;