const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    phoneVerifiedAt: Date,
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
