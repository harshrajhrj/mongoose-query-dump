const app = require('express').Router();

app.get('/', (req, res) => {
    res.json({ message: "You're home" });
});

app.use('/student', require('./student'));

module.exports = app;