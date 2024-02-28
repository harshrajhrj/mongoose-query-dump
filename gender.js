const express = require('express');
const gender = require('./models/gender');
require('./mongo-connect')();
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/gender', async (req, res) => {
    try {
        console.log(req.body);
        const Gender = new gender({
            gender: req.body.gender,
            pronoun: req.body.pronoun
        });

        return res.status(200).json(await Gender.save());
    } catch (err) {
        console.log(err.message);
        return res.status(401).json(err);
    }
})
app.listen(3000, () => console.log('Listening on port 3000!'));