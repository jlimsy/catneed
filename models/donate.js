const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donateSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://www.wallingtonanimalrescue.com/uploads/9/5/7/1/9571785/testimonial-cat-4_2.png",
    },
    description: { type: String, required: true },
    expiry: { type: Date },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donate", donateSchema);
