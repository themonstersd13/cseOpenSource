const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

// Middleware
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Database connection
connectDB();

// API Routes
app.use('/api/users', userRoutes);

// Fallback Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
