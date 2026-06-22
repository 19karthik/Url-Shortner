const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new Error('Unauthorized: Admin access required'));
  }
  next();
};

module.exports = adminMiddleware;
