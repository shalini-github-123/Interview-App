require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

// Define the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log request paths and methods
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// User routes
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Start the server after successful database connection
    app.listen(port, '0.0.0.0', () => {
      console.log(`Connected to DB & listening on port ${port}`);
    });
  })
  .catch((error) => {
    // Log database connection errors
    console.error('Database connection error:', error);
  });

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
