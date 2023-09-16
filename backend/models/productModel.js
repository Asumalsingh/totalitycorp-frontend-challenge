import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    categories: { type: [String], require: true },
    type: { type: String, require: true },
    size: { type: [String], require: true },
    price: { type: Number, require: true },
    discount: Number,
    image: { id: String, url: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productSchema);
