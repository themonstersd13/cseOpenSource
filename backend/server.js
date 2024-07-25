const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { put } = require('@vercel/blob');
require('dotenv').config();
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
// mongoose.connect(process.env.MONGO_URLLocal);
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

app.use(express.urlencoded({ extended: true }));

db.on("error", () => console.log("error"));
db.once("open", () => console.log("successful"));


app.post('/register',(req,res)=>{
  const {username,password,prn} =req.body;
  const data={
    username:username,
    password:password,
    prn:prn,
    arr:[],
    titleArr:[]
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
    if(result.password && result.username){
    res.status(200).json({message:"successfull",data:result});
    }
    else{
      res.status(404).json({message:"invalid"});  
    }
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
    res.status(200).json({arr:result.arr,message:"retrived",titleVector:result.titleArr})
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({message:"error occured"})
  })
})

app.post('/my-notes-update-arr',(req,res)=>{
  const {username,password,filename,url} = req.body;
  const data={
    username:username,
    password:password
  }
  db.collection('users').findOne(data)
  .then((result)=>{
    let dataVector=result.arr;
    let titleVector=result.titleArr;
    titleVector.push(filename);
    console.log("data:",result)
    dataVector.push(url);
    console.log(dataVector)
    db.collection('users').updateOne(
      data,
      { $set: { arr: dataVector ,titleArr: titleVector} }
    )
    .then(()=>{
      console.log(dataVector);
      res.status(200).json({message:"updated",arr:dataVector,titleVector});
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

app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const currentId = req.body.currentId;
  const file = req.files.file;
  const fileName = `${req.body.filename}${path.extname(file.name)}`;

  try {
    
    const { url } = await put(fileName, file.data, { access: 'public' });

    db.collection("DomainData").findOne({ idName: currentId })
    .then((obs) => {
      if (obs && obs.arr && obs.titleArr) {
        let dataVector = obs.arr;
        let titleVector= obs.titleArr;
        titleVector.push(fileName);
        dataVector.push(url); 

        db.collection("DomainData").updateOne(
          { idName: currentId },
          { $set: { arr: dataVector ,titleArr:titleVector} }
        )
        .then(() => {
          res.json({ currentId: currentId, fileName, dataVector, titleVector});
        })
        .catch((err) => {
          console.error('Database update failed', err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      } else {
        let data = {
          idName: currentId,
          arr: [url],
          titleArr:[fileName]
        };

        db.collection('DomainData').insertOne(data, (err) => {
          if (err) {
            res.json({ message: err });
          }
          console.log("done data successfully");
          res.json({ message: "successful", currentId, fileName, dataVector: [url] ,titleArr:[fileName]});
        });
      }
    })
    .catch((err) => {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  } catch (err) {
    console.error('File upload failed', err);
    res.status(500).json({ error: 'File upload failed' });
  }
});
app.post("/passdata", (req, res) => {
const {currentId}=req.body;
console.log("id",currentId);
db.collection("DomainData").findOne({idName:currentId})

.then((obs)=>{
  console.log("obs",obs)
    if (obs && obs.arr && obs.titleArr) {
        console.log('Result:', obs.arr);
        let dataVector=obs.arr;
        let titleVector=obs.titleArr;
        res.json({arr:dataVector,titleVector});
      } else {
          let data={
            idName:currentId,
            arr:[],
            titleArr:[]
          }
          db.collection("DomainData").insertOne(data, (err, collection) => {
          if (err) {
            res.json({message:err});
          }
          console.log("done data successfully ");
          res.json({message:"successful",arr:[],titleArr:[]});
        });
      }
    })
    .catch((err) => {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})
  
app.post('/leaderboard',(req,res)=>{
   db.collection('leaderboard').findOne({leaderboard:"learderboard"})
   .then((data)=>{
      res.json({arr:data.arrPrn,arr2:data.arrCoins});
   })
   .catch((err)=>{
      res.json({message:"error"})
   })
  //  res.json({message:"done"})
})

app.get("/",(req,res)=>{
  res.send("working");
})
app.listen(3500||process.env.PORT, () => {
  console.log(`Server is running on port 3500`);
});
