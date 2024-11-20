const express = require('express');
const router = express.Router();
const { loadNotes, updateNotes } = require('../controllers/notesController');

router.post('/load-my-notes', loadNotes);

router.post('/my-notes-update-arr', updateNotes);

module.exports = router;
