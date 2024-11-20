const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoute');
const domainDataRoutes = require('./routes/domainDataRoute');
// const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Database connection
connectDB();
app.use('/', authRoutes);
app.use('/', notesRoutes);
app.use('/', fileUploadRoutes);
app.use('/', domainDataRoutes);
// app.use('/', leaderboardRoutes);

app.listen(3500 || process.env.PORT, () => {
  console.log('Server is running on port 3500');
});
