import mongoose from "mongoose";
import { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number },
    checked: { type: Boolean, default: true},
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("cart", cartSchema);
