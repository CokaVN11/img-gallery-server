const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');

// Get all folders
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find().sort({ path: 1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific folder
router.get('/:id', getFolderById, (req, res) => {
  res.json(res.folder);
});

// Middleware function to get folder by ID
async function getFolderById(req, res, next) {
  try {
    const folder = await Folder.findById(req.params.id);
    if (folder == null) {
      return res.status(404).json({ message: 'Cannot find folder' });
    }
    res.folder = folder;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
