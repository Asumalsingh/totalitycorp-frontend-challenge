import express, { response } from "express";
const router = express.Router();
import validateUser from "../middlewares/validateUser.js";
import orderModel from "../models/orderModel.js";

router.get("/get", validateUser, async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    console.log(orders)
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
