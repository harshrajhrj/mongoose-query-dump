const app = require('express').Router();

app.get('/', (req, res) => {
    res.json({ message: "You're home" });
});

app.use('/file', require('./file'));

module.exports = app;