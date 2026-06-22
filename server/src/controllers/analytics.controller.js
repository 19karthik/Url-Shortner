const analyticsService = require('../services/analytics.service');

const getSummary = async (req, res, next) => {
  try {
    const summary = await analyticsService.getAnalyticsSummary(req.user.id);
    res.json(summary);
  } catch (err) {
    next(err);
  }
};

const getClicksPerDay = async (req, res, next) => {
  try {
    const data = await analyticsService.getClicksPerDay(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getTopUrls = async (req, res, next) => {
  try {
    const limit = req.query.limit || 5;
    const topUrls = await analyticsService.getTopUrls(req.user.id, limit);
    res.json(topUrls);
  } catch (err) {
    next(err);
  }
};

module.exports = { getSummary, getClicksPerDay, getTopUrls };
