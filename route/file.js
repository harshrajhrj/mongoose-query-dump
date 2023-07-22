const app = require('express').Router();
const Storage = require('../gridFs-storage/fileStorage');

// baseURL /file/..
app.post('/', Storage.upload.single('file'), (req, res) => {
    res.json(req.file);
});

app.get('/:id', (req, res) => {
    Storage.retrieve(req, res);
});

app.delete('/:id', (req, res) => {
    res.json(Storage.delete(req.params.id));
});

module.exports = app;