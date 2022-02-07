const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productTitle: String,
        productDescription: String,
        productImage: String,
        productLink: {type: [String], index: true},
        productPrice: String,
        productPriceCurrency: String,
        updatedAt: Date
    }
);

module.exports = mongoose.model('Product', productSchema, 'products')