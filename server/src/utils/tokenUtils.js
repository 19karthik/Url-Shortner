const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'jwt_secret',
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '24h' }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
};

module.exports = { generateAccessToken, verifyAccessToken };
