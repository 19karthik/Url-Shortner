const User = require('../models/user.model');
const Url = require('../models/url.model');
const Click = require('../models/click.model');

const getAllUsers = async () => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  return users;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error('User not found');
  
  const urls = await Url.find({ userId });
  const urlIds = urls.map(url => url._id);
  await Click.deleteMany({ urlId: { $in: urlIds } });
  await Url.deleteMany({ userId });
  
  return { message: 'User and associated data deleted' };
};

const banUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { isBanned: true }, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

const unbanUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { isBanned: false }, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

const getSystemAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isBanned: false });
  const bannedUsers = await User.countDocuments({ isBanned: true });
  const totalUrls = await Url.countDocuments();
  const activeUrls = await Url.countDocuments({ isActive: true });
  const expiredUrls = await Url.countDocuments({ isActive: false, expiresAt: { $lt: new Date() } });
  const disabledUrls = await Url.countDocuments({ isActive: false });
  const totalClicks = await Click.countDocuments();
  
  return {
    users: { total: totalUsers, active: activeUsers, banned: bannedUsers },
    urls: { total: totalUrls, active: activeUrls, expired: expiredUrls, disabled: disabledUrls },
    clicks: totalClicks
  };
};

module.exports = { getAllUsers, deleteUser, banUser, unbanUser, getSystemAnalytics };
