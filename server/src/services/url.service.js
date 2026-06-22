const Url = require('../models/url.model');
const { nanoid } = require('nanoid');

const createShortUrl = async (payload, userId) => {
  const { originalUrl, customAlias, expiresAt } = payload;
  if (!originalUrl) throw new Error('originalUrl is required');

  if (customAlias) {
    const exists = await Url.findOne({ $or: [{ customAlias }, { shortCode: customAlias }] });
    if (exists) throw new Error('Alias already in use');
  }

  const shortCode = customAlias || nanoid(6);
  const url = await Url.create({ 
    originalUrl, 
    shortCode, 
    customAlias: customAlias || null, 
    userId, 
    expiresAt: expiresAt || null 
  });
  return url;
};

const getUrlsByUser = async (userId) => {
  const urls = await Url.find({ userId }).sort({ createdAt: -1 });
  return urls;
};

const getUrlById = async (urlId, userId) => {
  const url = await Url.findOne({ _id: urlId, userId });
  if (!url) throw new Error('URL not found');
  return url;
};

const updateUrl = async (urlId, userId, payload) => {
  const { customAlias, expiresAt } = payload;
  const url = await Url.findOne({ _id: urlId, userId });
  if (!url) throw new Error('URL not found');

  if (customAlias && customAlias !== url.customAlias) {
    const exists = await Url.findOne({ customAlias });
    if (exists) throw new Error('Alias already in use');
    url.customAlias = customAlias;
  }

  if (expiresAt !== undefined) url.expiresAt = expiresAt;
  await url.save();
  return url;
};

const deleteUrl = async (urlId, userId) => {
  const url = await Url.findOneAndDelete({ _id: urlId, userId });
  if (!url) throw new Error('URL not found');
  return { message: 'URL deleted' };
};

const toggleUrlStatus = async (urlId, userId) => {
  const url = await Url.findOne({ _id: urlId, userId });
  if (!url) throw new Error('URL not found');
  url.isActive = !url.isActive;
  await url.save();
  return url;
};

module.exports = { createShortUrl, getUrlsByUser, getUrlById, updateUrl, deleteUrl, toggleUrlStatus };
