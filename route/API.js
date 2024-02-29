const { upload, retrieve } = require('../FileHandling/Blob');
const app = require('express').Router();

app.get('/', (req, res) => {
    res.json({ message: "You're home" });
});

app.post('/', upload.array('file'), async (req, res) => {
    res.json(req.files);
})

app.get('/:id', (req, res) => {
    retrieve(req, res);
})

/**
 * Added the routes or a group of routes in a directory using
 * app.use(middleware)
 * 
 * Ex:-
 * app.use('/user', require('./users/profile'));
 * app.use('/user', require('./users/orders'));
 * 
 * In this way, we can create many nested routes
 */

module.exports = app;