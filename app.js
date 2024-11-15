//The main app configuration, loading the environment, routes, and database connection.

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicleRoutes');
const orgRoutes = require('./routes/orgRoutes');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.use('/vehicles', vehicleRoutes);
app.use('/orgs', orgRoutes);

app.use('/api', orgRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  
module.exports = app;
