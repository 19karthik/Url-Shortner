const { verifyAccessToken } = require('../utils/tokenUtils');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) throw new Error('No token provided');
    
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
