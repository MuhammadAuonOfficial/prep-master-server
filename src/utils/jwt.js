const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

const generateToken = (user) => {
    const payload = {
        id: user.id, // Subject (user ID)
        name: user.username,
        email: user.email,
        role: user.roleId,
        // permissions: user.permissions For future use
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
