// server.js
const express = require('express');
const app = express();
require('dotenv').config();

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes');

app.use(express.json());

app.use('/api/admin', authRoutes);

app.use('/api/user', userRoutes);
app.use('/api/templates', templateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Admin Auth server running on port ${PORT}`);
});
