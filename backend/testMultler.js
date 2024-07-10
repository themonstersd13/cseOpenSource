const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(fileUpload());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/miDomains");
const db = mongoose.connection;

db.on("error", () => console.log("error"));
db.once("open", () => console.log("successful"));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const currentId = req.body.currentId;
  const file = req.files.file;
  const fileName=`${Date.now()}${path.extname(file.name)}`;
  // Set destination path dynamically
  const uploadPath = `E:/PROGRAMING/webD/openSourceWceCse/frontend/public/data/${currentId}/${fileName}`;

  // Use mv() method to place file on server
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let dataVector = JSON.parse(req.body.dataVector);
    dataVector.push(fileName);

    db.collection("DomainData").findOne({ idName: currentId })
      .then((obs) => {
        if (obs && obs.arr) {
          db.collection("DomainData").updateOne(
            { idName: currentId },
            { $set: { arr: dataVector } }
          )
          .then(() => {
            res.json({ currentId: currentId, fileName,dataVector });
          })
          .catch((err) => {
            console.error('Database update failed', err);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        } else {
          console.log('No data found');
          res.status(404).json({ error: 'No data found' });
        }
      })
      .catch((err) => {
        console.error('Database query failed', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    // res.json({ currentId: currentId, fileName });
  });
  
});

// Start server
const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
