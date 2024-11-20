const bcrypt = require('bcrypt');
const User = require('../models/User'); 

exports.loadNotes = async (req, res) => {
  const { username, password } = req.body;
  const data = { username };

  try {
    
    const result = await User.findOne(data);

    if (result) {
      
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (isPasswordValid) {
        res.status(200).json({ arr: result.arr, message: "retrieved", titleVector: result.titleArr });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred" });
  }
};

exports.updateNotes = async (req, res) => {
  const { username, password, filename, url } = req.body;
  const data = { username };

  try {
   
    const result = await User.findOne(data);

    if (result) {
    
      const isPasswordValid = await bcrypt.compare(password, result.password);

      if (isPasswordValid) {
        
        let dataVector = result.arr;
        let titleVector = result.titleArr;
        titleVector.push(filename);
        dataVector.push(url);

        await User.updateOne(
          data,
          { $set: { arr: dataVector, titleArr: titleVector } }
        );

        res.status(200).json({ message: "updated", arr: dataVector, titleVector });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
