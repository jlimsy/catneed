const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
