const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postal: {
      type: String,
      trim: true,
      minLength: 6,
    },
    lat: { type: String, trim: true },
    long: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Postal", postalSchema);
