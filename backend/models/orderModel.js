import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    stripeCustomerId: String,
    paymentIntentId : String,
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, require: true },
    shipping: { type: Object, require: true },
    deliveryStatus: { type: String, default: "pending" },
    pamentStatus: { type: String, require: true },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orderSchema);
