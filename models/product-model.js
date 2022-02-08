const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        link: {type: String, index: {unique: true, dropDups: true, sparse: true}},
        price: String,
        currency: String,
        updatedAt: Date
    }
);

module.exports = mongoose.model('Product', productSchema, 'products')