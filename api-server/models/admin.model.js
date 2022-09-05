const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let adminSchema = Schema({
    fName: {
        type: String,
        required: 'Enter your first name'
    },
    lName: {
        type: String,
        required: 'Enter your last name'
    },
    email: {
        type: String,
        required: 'A valid email address is required'
    },
    password: {
        type: String,
        required: 'Enter a password',
        minLength: [4, 'Password Must be at least 4 characters long']
    },
    photo: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('admin', adminSchema);