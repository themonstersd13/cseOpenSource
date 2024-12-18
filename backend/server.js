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
const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://notesadda.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with', '*'], 
  exposedHeaders: ['Content-Disposition'],
  credentials: true, 
};
app.use(cors(corsOptions));
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Dynamically set origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200); // Respond OK
});


app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// Database connection
connectDB();
app.use('/', authRoutes);
app.use('/', notesRoutes);
app.use('/', fileUploadRoutes);
app.use('/', domainDataRoutes);
// app.use('/', leaderboardRoutes);
app.get('/',(req,res)=>{
  res.send("td");
})
app.listen(3500 || process.env.PORT, () => {
  console.log('Server is running on port 3500');
});
