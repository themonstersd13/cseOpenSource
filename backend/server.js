const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
mongoose.connect("mongodb://localhost:27017/miDomains");

const db = mongoose.connection;

app.use(express.urlencoded({ extended: true }));

db.on("error", () => console.log("error"));
db.once("open", () => console.log("successful"));


app.post('/register',(req,res)=>{
  const {username,password} =req.body;
  const data={
    username:username,
    password:password,
    arr:[]
  }
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      res.json({message:err});
    }
    console.log("done data successfully ");
    res.json({message:"successful"});
  });
})

app.post('/login',(req,res)=>{
  const {username,password} = req.body;
  const data={
    username:username,
    password:password
  }
  db.collection('users').findOne(data)
  .then((result)=>{
    res.status(200).json({message:"successfull",data:result});
  })
  .catch((err)=>{
    console.log(err);
    res.status(404).json({message:"invalid"});
  })
})

app.post('/load-my-notes',(req,res)=>{
  const {username,password} = req.body;
  const data={
    username:username,
    password:password
  }
  db.collection('users').findOne(data)
  .then((result)=>{
    res.status(200).json({arr:result.arr,message:"retrived"})
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({message:"error occured"})
  })
})

app.post('/my-notes-update-arr',(req,res)=>{
  const {username,password,currentId,filename} = req.body;
  const data={
    username:username,
    password:password
  }
  db.collection('users').findOne(data)
  .then((result)=>{
    let dataVector=result.arr;
    console.log("data:",result)
    dataVector.push(`${currentId}/${filename}`);
    console.log(dataVector)
    db.collection('users').updateOne(
      data,
      { $set: { arr: dataVector } }
    )
    .then(()=>{
      console.log(dataVector);
      res.status(200).json({message:"updated",arr:dataVector});
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({error:err});
    })
  })
  .catch((err)=>{
    res.status(500).json({error:err});
  })
})


app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const currentId = req.body.currentId;
  const file = req.files.file;
  const fileName=`${req.body.filename}${path.extname(file.name)}`;
  
  const uploadPath = `E:/PROGRAMING/webD/openSourceWceCse/frontend/public/data/${currentId}/${fileName}`;

  
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
      
    }
    db.collection("DomainData").findOne({ idName: currentId })
    .then((obs) => {
      let dataVector=obs.arr;
      dataVector.push(fileName);
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
  });
  
});

app.post("/passdata", (req, res) => {
const {currentId}=req.body;
console.log("id",currentId);
db.collection("DomainData").findOne({idName:currentId})

.then((obs)=>{
  console.log("obs",obs)
    if (obs && obs.arr) {
        console.log('Result:', obs.arr);
        let dataVector=obs.arr;
        res.json({arr:dataVector});
      } else {
        console.log('No data found');
        res.status(404).json({ error: 'No data found' });
      }
    })
    .catch((err) => {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})

  app.listen(3500, () => {
    console.log('Server is running on port 3500');
  });
