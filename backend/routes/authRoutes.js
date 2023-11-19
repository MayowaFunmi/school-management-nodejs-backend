const express = require('express');
const jwt = require('jsonwebtoken');
const verifyLogin = require('../middleware/verifyLogin');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');

// routes to handle user sign in
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // create access token
        const accessToken = jwt.sign(
            {
                userId: user._id, roles: user.roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m'}
        );

        res.status(200).json({ messgae: "user signed in successfully", accessToken: accessToken})
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
})


// refresh token endpoint
router.post('/refreshToken', verifyLogin, (req, res) => {
    // User is already authenticated, and the access token is valid
    // Generate a new access token
    const newAccessToken = jwt.sign(
        {
        userId: req.user.userId,
        roles: req.user.roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'}
    );
    res.status(200).json({ newAccessToken: newAccessToken })
});

module.exports = router;