const jwt = require('jsonwebtoken');

const verifyLogin = (req, res, next) => {
    // get the token from authenticated header
    const token = req.headers.authorization;

    // check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access token not provided.' });
    }

    try {
        // verify the token using the secret key
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying access token:', error);
    return res.status(401).json({ message: 'user not authenticated.' });
    }
};

module.exports = verifyLogin;