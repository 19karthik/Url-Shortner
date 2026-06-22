const Click = require('../models/click.model');
const Url = require('../models/url.model');

const getTotalClicks = async (userId) => {
  const result = await Click.aggregate([
    {
      $lookup: {
        from: 'urls',
        localField: 'urlId',
        foreignField: '_id',
        as: 'url'
      }
    },
    { $unwind: '$url' },
    { $match: { 'url.userId': userId } },
    { $count: 'total' }
  ]);
  return result[0]?.total || 0;
};

const getTodayClicks = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const result = await Click.aggregate([
    { $match: { clickedAt: { $gte: today } } },
    {
      $lookup: {
        from: 'urls',
        localField: 'urlId',
        foreignField: '_id',
        as: 'url'
      }
    },
    { $unwind: '$url' },
    { $match: { 'url.userId': userId } },
    { $count: 'total' }
  ]);
  return result[0]?.total || 0;
};

const getLast7DaysClicks = async (userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const result = await Click.aggregate([
    { $match: { clickedAt: { $gte: sevenDaysAgo } } },
    {
      $lookup: {
        from: 'urls',
        localField: 'urlId',
        foreignField: '_id',
        as: 'url'
      }
    },
    { $unwind: '$url' },
    { $match: { 'url.userId': userId } },
    { $count: 'total' }
  ]);
  return result[0]?.total || 0;
};

const getLast30DaysClicks = async (userId) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const result = await Click.aggregate([
    { $match: { clickedAt: { $gte: thirtyDaysAgo } } },
    {
      $lookup: {
        from: 'urls',
        localField: 'urlId',
        foreignField: '_id',
        as: 'url'
      }
    },
    { $unwind: '$url' },
    { $match: { 'url.userId': userId } },
    { $count: 'total' }
  ]);
  return result[0]?.total || 0;
};

const getClicksPerDay = async (userId) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const result = await Click.aggregate([
    { $match: { clickedAt: { $gte: thirtyDaysAgo } } },
    {
      $lookup: {
        from: 'urls',
        localField: 'urlId',
        foreignField: '_id',
        as: 'url'
      }
    },
    { $unwind: '$url' },
    { $match: { 'url.userId': userId } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$clickedAt' } },
        clicks: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  
  return result.map(item => ({ date: item._id, clicks: item.clicks }));
};

const getTopUrls = async (userId, limit = 5) => {
  const result = await Url.find({ userId })
    .sort({ clickCount: -1 })
    .limit(limit)
    .select('shortCode customAlias originalUrl clickCount');
  
  return result;
};

const getAnalyticsSummary = async (userId) => {
  const [total, today, last7, last30, topUrls] = await Promise.all([
    getTotalClicks(userId),
    getTodayClicks(userId),
    getLast7DaysClicks(userId),
    getLast30DaysClicks(userId),
    getTopUrls(userId)
  ]);
  
  return { total, today, last7, last30, topUrls };
};

module.exports = { getTotalClicks, getTodayClicks, getLast7DaysClicks, getLast30DaysClicks, getClicksPerDay, getTopUrls, getAnalyticsSummary };
