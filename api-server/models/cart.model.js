const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);