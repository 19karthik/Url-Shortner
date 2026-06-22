const urlService = require('../services/url.service');

const createShortUrl = async (req, res, next) => {
  try {
    const payload = req.body;
    const url = await urlService.createShortUrl(payload, req.user.id);
    res.status(201).json(url);
  } catch (err) {
    next(err);
  }
};

const getUserUrls = async (req, res, next) => {
  try {
    const urls = await urlService.getUrlsByUser(req.user.id);
    res.json(urls);
  } catch (err) {
    next(err);
  }
};

const getUrlById = async (req, res, next) => {
  try {
    const url = await urlService.getUrlById(req.params.id, req.user.id);
    res.json(url);
  } catch (err) {
    next(err);
  }
};

const updateUrl = async (req, res, next) => {
  try {
    const url = await urlService.updateUrl(req.params.id, req.user.id, req.body);
    res.json(url);
  } catch (err) {
    next(err);
  }
};

const deleteUrl = async (req, res, next) => {
  try {
    const result = await urlService.deleteUrl(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const toggleUrlStatus = async (req, res, next) => {
  try {
    const url = await urlService.toggleUrlStatus(req.params.id, req.user.id);
    res.json(url);
  } catch (err) {
    next(err);
  }
};

module.exports = { createShortUrl, getUserUrls, getUrlById, updateUrl, deleteUrl, toggleUrlStatus };
