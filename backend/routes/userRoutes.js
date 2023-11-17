const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const USER = require('../models/userModel');
const ROLE = require('../models/userRoles');
const verifyLogin = require('../middleware/verifyLogin');
const { checkSuperAdminRole } = require('../middleware/checkAdmin');

// user registration
router.post('/register-user', async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        // check if email or username exists
        const existingUser = await USER.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        // generate uniqueId
        const uniqueId = USER.generateUniqueId();

        // default role
        const defaultRole = await ROLE.findOne({ roleName: "USER" });
        if (!defaultRole) {
            return res.status(500).json({ message: "Default role not found" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new USER({
            username,
            firstName,
            lastName,
            uniqueId, 
            roles: [defaultRole._id],
            email,
            password: hashedPassword
        });

        // save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: "user registered successfully", data: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// get user by Id
router.get('/get-user-by-id/:userId', verifyLogin, checkSuperAdminRole, async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }

        const user = await USER.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user })
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// get all users
router.get('/list-all-users', verifyLogin, checkSuperAdminRole, async (req, res) => {
    try {
        const users = await USER.find();
        res.status(200).json({ message: `all ${users.length} users fetched successfully`, data: users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
})

module.exports = router;