require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./src/routes/auth.routes');
const urlRoutes = require('./src/routes/url.routes');
const analyticsRoutes = require('./src/routes/analytics.routes');
const adminRoutes = require('./src/routes/admin.routes');
const redirectRoutes = require('./src/routes/redirect.routes');

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'URL Shortener API' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/', redirectRoutes);

app.use(errorHandler);

module.exports = app;
