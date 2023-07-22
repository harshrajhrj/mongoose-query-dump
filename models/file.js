const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fileId: String,
    fileUrl: String,
}, { collection: 'file', timestamps: true });

module.exports = mongoose.model('File', FileSchema);