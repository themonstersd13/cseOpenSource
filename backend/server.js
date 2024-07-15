const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();
const bcrypt = require('bcrypt');
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", () => console.log("Database connection error"));
db.once("open", () => console.log("Database connected successfully"));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = { username, password: hashedPassword, arr: [] };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.json({ message: "User registered successfully" });
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.collection('users').findOne({ username })
    .then(async (result) => {
      if (result && await bcrypt.compare(password, result.password)) {
        res.status(200).json({ message: "Login successful", data: result });
      } else {
        res.status(404).json({ message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

app.post('/load-my-notes', (req, res) => {
  const { username, password } = req.body;

  db.collection('users').findOne({ username })
    .then(async (result) => {
      if (result && await bcrypt.compare(password, result.password)) {
        res.status(200).json({ arr: result.arr, message: "Notes retrieved" });
      } else {
        res.status(404).json({ message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

app.post('/my-notes-update-arr', (req, res) => {
  const { username, password, currentId, filename } = req.body;

  db.collection('users').findOne({ username })
    .then(async (result) => {
      if (result && await bcrypt.compare(password, result.password)) {
        let dataVector = result.arr;
        dataVector.push(`${currentId}/${filename}`);

        db.collection('users').updateOne(
          { username },
          { $set: { arr: dataVector } }
        )
          .then(() => res.status(200).json({ message: "Updated", arr: dataVector }))
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
          });
      } else {
        res.status(404).json({ message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { currentId, filename } = req.body;
  const file = req.files.file;
  const fileName = `${filename}${path.extname(file.name)}`;
  const uploadPath = path.join(__dirname, `../frontend/public/notes/${currentId}/${fileName}`);

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    db.collection("DomainData").findOne({ idName: currentId })
      .then((obs) => {
        let dataVector = obs ? obs.arr : [];
        dataVector.push(fileName);

        db.collection("DomainData").updateOne(
          { idName: currentId },
          { $set: { arr: dataVector } },
          { upsert: true }
        )
          .then(() => res.json({ currentId, fileName, dataVector }))
          .catch((err) => {
            console.error('Database update failed', err);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      })
      .catch((err) => {
        console.error('Database query failed', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
});

app.post("/passdata", (req, res) => {
  const { currentId } = req.body;

  db.collection("DomainData").findOne({ idName: currentId })
    .then((obs) => {
      if (obs && obs.arr) {
        res.json({ arr: obs.arr });
      } else {
        const data = { idName: currentId, arr: [] };
        db.collection("DomainData").insertOne(data, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: err });
          }
          res.json({ message: "Document created", arr: [] });
        });
      }
    })
    .catch((err) => {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.get("/",(req,res)=>{
  res.send("working fine");
})
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
