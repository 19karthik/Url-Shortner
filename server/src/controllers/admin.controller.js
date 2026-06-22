const adminService = require('../services/admin.service');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.params.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const banUser = async (req, res, next) => {
  try {
    const user = await adminService.banUser(req.params.userId);
    res.json({ message: 'User banned', user });
  } catch (err) {
    next(err);
  }
};

const unbanUser = async (req, res, next) => {
  try {
    const user = await adminService.unbanUser(req.params.userId);
    res.json({ message: 'User unbanned', user });
  } catch (err) {
    next(err);
  }
};

const getSystemAnalytics = async (req, res, next) => {
  try {
    const analytics = await adminService.getSystemAnalytics();
    res.json(analytics);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, deleteUser, banUser, unbanUser, getSystemAnalytics };
