const DomainData = require('../models/DomainData'); 

exports.passData = async (req, res) => {
  const { currentId } = req.body;

  try {
    const obs = await DomainData.findOne({ idName: currentId });

    if (obs && obs.arr && obs.titleArr) {
      res.json({ arr: obs.arr, titleVector: obs.titleArr });
    } else {
      const data = {
        idName: currentId,
        arr: [],
        titleArr: []
      };

      await DomainData.create(data);

      res.json({ message: "successful", arr: [], titleArr: [] });
    }
  } catch (err) {
    console.error('Database query failed', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
