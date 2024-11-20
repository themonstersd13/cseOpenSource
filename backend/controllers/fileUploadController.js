const DomainData = require('../models/DomainData'); // Import the DomainData model

exports.uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const currentId = req.body.currentId;
  const file = req.files.file;
  const fileName = `${req.body.filename}${path.extname(file.name)}`;

  try {
    const { url } = await put(fileName, file.data, { access: 'public' });
    const obs = await DomainData.findOne({ idName: currentId });

    if (obs && obs.arr && obs.titleArr) {
      let dataVector = obs.arr;
      let titleVector = obs.titleArr;
      titleVector.push(fileName);
      dataVector.push(url);

      await DomainData.updateOne(
        { idName: currentId },
        { $set: { arr: dataVector, titleArr: titleVector } }
      );

      res.json({ currentId, fileName, dataVector, titleVector });
    } else {
      const newData = new DomainData({
        idName: currentId,
        arr: [url],
        titleArr: [fileName]
      });
      await newData.save(); 

      res.json({ message: "successful", currentId, fileName, dataVector: [url], titleArr: [fileName] });
    }
  } catch (err) {
    console.error('File upload failed', err);
    res.status(500).json({ error: 'File upload failed' });
  }
};
