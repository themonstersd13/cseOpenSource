const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
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
  
  const uploadPath = `E:/PROGRAMING/webD/openSourceWceCse/frontend/public/notes/${currentId}/${fileName}`;

  
  file.mv(uploadPath, (err) => {
    if (err) {
      console.log("in storing")
      return res.status(500).json({ error: err.message });
      
    }
    db.collection("DomainData").findOne({ idName: currentId })
    .then((obs) => {
      if (obs && obs.arr) {
        let dataVector=obs.arr;
        dataVector.push(fileName);
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
          let data={
            idName:currentId,
            arr:[fileName]
          }
          db.collection('DomainData').insertOne(data,(err)=>{
            if (err) {
              res.json({message:err});
            }
            console.log("done data successfully ");
            res.json({message:"successful",currentId,fileName,dataVector:[fileName]});
          })
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
          let data={
            idName:currentId,
            arr:[]
          }
          db.collection("DomainData").insertOne(data, (err, collection) => {
          if (err) {
            res.json({message:err});
          }
          console.log("done data successfully ");
          res.json({message:"successful",arr:[]});
        });
      }
    })
    .catch((err) => {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})

app.listen(3500||process.env.PORT, () => {
  console.log(`Server is running on port 3500`);
});
