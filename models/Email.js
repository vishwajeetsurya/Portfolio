const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('email', emailSchema)


