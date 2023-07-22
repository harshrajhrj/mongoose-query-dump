const mongoose = require('mongoose');

const mineralSchema = new mongoose.Schema({
    mineral: String
})
const fruitSchema = new mongoose.Schema({
    fruit: String,
    minerals: [mineralSchema]
}, { collection: 'fruits' });

module.exports = mongoose.model('Fruit', fruitSchema);