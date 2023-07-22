const mongoose = require('mongoose');

const StuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Minimum Length is 3"],
        maxLength: [10, "Maxium Length is 10"],
        enum: ['laxmi', 'sandeep']
    },
    roll: Number,
    mobile_no: {
        type: Number,
        required: true,
        min: [10, 'Phone number should be at least length 10'],
        max: 15
    },
    fees: {
        type: Boolean,
        required: true
    },
    salary: String
}, { collection: 'student', timestamps: true });

module.exports = mongoose.model('Student', StuSchema);