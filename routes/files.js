const express = require('express');
const router = express.Router();
const File = require('../models/file');

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get files in a specific folder
router.get('/folder/:folderId', async (req, res) => {
  try {
    const files = await File.find({ folderId: req.params.folderId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific file
router.get('/:id', getFileById, (req, res) => {
  res.json(res.file);
});

// Middleware function to get file by ID
async function getFileById(req, res, next) {
  try {
    const file = await File.findById(req.params.id);
    if (file == null) {
      return res.status(404).json({ message: 'Cannot find file' });
    }
    res.file = file;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
