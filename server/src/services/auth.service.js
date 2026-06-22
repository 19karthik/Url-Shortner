const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../utils/tokenUtils');


const register = async ({ name, email, password }) => {
  if (!name || !email || !password)
    throw new Error('Missing fields');

  const existing = await User.findOne({ email });

  if (existing)
    throw new Error('Email already in use');

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  const accessToken = generateAccessToken(user._id, user.role);

  return { id: user._id, name: user.name, email: user.email, accessToken };
};

const login = async ({ email, password }) => {
  if (!email || !password)
    new Error('Missing fields');

  const user = await User.findOne({ email });
  if (!user)
    throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken(user._id, user.role);
  return { id: user._id, email: user.email, name: user.name, accessToken };
};

module.exports = { register, login };
