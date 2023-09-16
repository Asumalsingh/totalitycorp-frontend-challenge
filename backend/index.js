import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import stripeRoute from "./routes/stripe.js";
import orderRoute from "./routes/order.js";
config();

const app = express();
import connectDb from "./db.js";
connectDb();

app.use(cors());
app.use(json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.send("Hey we are linve ✨");
});

// All available routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/stripe", stripeRoute);
app.use("/order", orderRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000. . .");
});
