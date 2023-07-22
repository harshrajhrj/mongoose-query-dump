const student = require('../models/student');
const app = require('express').Router();

app.post('/insert', async (req, res) => {
    try {
        // const Student = new student({
        //     name: req.body.name,
        //     roll: req.body.roll
        // })
        // await Student.save();
        await student.insertMany(req.body);
        res.send('Data inserted');
    } catch (err) {
        console.log(err.message)
    }
})

app.post('/update', async (req, res) => {
    const document = await student.updateOne({ name: req.body.name }, {
        $set: {
            name: req.body.newname
        }
    }, { new: true })
    res.json(document);
})

app.delete('/delete', async (req, res) => {
    try {
        const data = await student.deleteOne({ name: req.body.name });
        res.json(data);
    } catch (err) {
        console.log(err.message)
    }
})

app.get('/fetch', async (req, res) => {
    try {
        console.log(req.query)
        const Students = await student.find({}).select({ name: 1, _id: 0 }).sort({ name: parseInt(req.query.sort, 10) || 1 });
        res.json(Students);
    } catch (err) {
        console.log(err.message);
    }
})
module.exports = app;