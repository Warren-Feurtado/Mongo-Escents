const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodName: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "brand",
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    // sizes: [
    //     {
    //         size: {
    //             type: String,
    //             required: true
    //         },
    //         price: {
    //             type: Number,
    //             required: true
    //         }
    //     }
    // ]
});

module.exports = mongoose.model('Product', productSchema);