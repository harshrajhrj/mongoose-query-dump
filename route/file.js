const app = require('express').Router();
const Storage = require('../gridFs-storage/fileStorage');

// baseURL /file/..
app.get('/', (req, res) => {
    res.render('multipleFile.ejs');
})

app.post('/', Storage.upload.single('file'), (req, res) => {
    res.json(req.file);
});

app.post('/multiple', Storage.upload.array('files'), (req, res) => {
    res.json({
        message: 'Uploaded'
    });
});

app.get('/:id', (req, res) => {
    Storage.retrieve(req, res);
});

app.delete('/:id', (req, res) => {
    res.json(Storage.delete(req.params.id));
});

module.exports = app;