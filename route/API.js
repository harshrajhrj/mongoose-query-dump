const app = require('express').Router();

app.get('/', (req, res) => {
    res.json({ message: "You're home" });
});

app.use('/file', require('./file'));
app.use('/student', require('./student'));
app.use('/fruit', require('./fruit'));

module.exports = app;