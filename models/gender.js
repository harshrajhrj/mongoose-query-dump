const mongoose = require('mongoose');

const GenderSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: { values: ['male', 'female'], message: '{VALUE} is an invalid gender.' },
        required: true
    },
    pronoun: {
        type: String,
        validate: {
            validator: function (v) {
                if (this.gender === 'male') {
                    if (v === 'he')
                        return true;
                    else
                        return false;
                } else if (this.gender === 'female') {
                    if (v === 'she')
                        return true;
                    else
                        return false;
                }
            },
            message: props => `${props.value} is an invalid pronoun for given gender.`
        },
        required: true
    }
}, { collection: 'gender', timestamps: true });

module.exports = mongoose.model('Gender', GenderSchema);