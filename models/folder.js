const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Folder', folderSchema);
