const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donateSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: Object },
    description: { type: String, required: true },
    expiry: { type: String },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donate", donateSchema);
