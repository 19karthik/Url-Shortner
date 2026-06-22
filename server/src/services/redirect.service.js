const Url = require('../models/url.model');
const Click = require('../models/click.model');

const redirectUrl = async (shortCodeOrAlias) => {
  const url = await Url.findOne({
    $or: [{ shortCode: shortCodeOrAlias }, { customAlias: shortCodeOrAlias }]
  });

  if (!url) throw new Error('Short URL not found');
  if (!url.isActive) throw new Error('URL is disabled');
  if (url.expiresAt && new Date() > url.expiresAt) throw new Error('URL has expired');

  await Click.create({ urlId: url._id });
  url.clickCount += 1;
  await url.save();

  return url.originalUrl;
};

module.exports = { redirectUrl };
