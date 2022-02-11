const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    productName: String,
    productImage: String,
    productLink: String,
    productPrice: Number,
    productPriceCurrency: String,
    productDescription: String,
    productQuantity: Number,
    fromCountry: Number,
    toCountry: Number,
    toCity: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    feeToTraveler: Number,
    feeToTravelerCurrency: String,
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.productImage = `${process.env.APP_URL}/${ret.productImage}`;
      },
    },
  }
);

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", orderSchema);
