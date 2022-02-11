const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const travelSchema = new Schema({
  departureCountry: Number,
  departureCity: Number,
  destinationCountry: Number,
  destinationCity: Number,
  date: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

travelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Travel", travelSchema);
