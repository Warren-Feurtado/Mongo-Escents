const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    logoSrc: {
        type: String,
        required: true
    },
    logoAlt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('brand', brandSchema);