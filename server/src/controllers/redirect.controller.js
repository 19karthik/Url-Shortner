const redirectService = require('../services/redirect.service');

const handleRedirect = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await redirectService.redirectUrl(shortCode);
    res.redirect(originalUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = { handleRedirect };
