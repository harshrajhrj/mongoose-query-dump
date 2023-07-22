const app = require('express').Router();
const fruit = require('../models/fruit');

app.post('/insert', async (req, res) => {
    try {
        const payload = req.body;
        const Fruit = await fruit.insertMany(payload);
        res.json(Fruit);
    } catch (err) {
        console.log(err.message);
    }
})

app.post('/update', async (req, res) => {
    try {
        const updateFruit = await fruit.updateMany(
            {
            }, {
            $set: {
                "minerals.$[].mineral": req.body.mineral
            }
        })
        res.json(updateFruit);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = app;