const express = require('express');
const router = express.Router();
const { passData } = require('../controllers/domainDataController');

router.post('/passdata', passData);


module.exports = router;
