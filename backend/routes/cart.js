import express from "express";
const router = express.Router();
import validateUser from "../middlewares/validateUser.js";

import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// add item in cart at : "/cart/addToCart"
router.post("/add/:productId", validateUser, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  const { quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ userId, productId });
    if (cart) {
      return res.status(403).send({ message: "Item alrady exists in cart" });
    }
    // If Item not exists in cart
    cart = new cartModel({ userId, productId, quantity });
    const savedCart = await cart.save();
    const product = await productModel.findOne({ _id: productId });
    // Use the .lean() method to get a plain JavaScript object
    const savedCartWithDetails = savedCart.toObject();
    savedCartWithDetails.details = product;

    return res.status(201).send(savedCartWithDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// update item in cart
router.put("/update/:id", validateUser, async (req, res) => {
  try {
    // Check if cart item exists
    const cartId = req.params.id;
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    // Validate the incoming data
    const { quantity, checked } = req.body;
    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    // Use findByIdAndUpdate to update the cart item's quantity
    const updatedCart = await cartModel.findByIdAndUpdate(
      cartId,
      { quantity, checked },
      { new: true }
    );

    return res.status(200).send(updatedCart);
  } catch (error) {
    console.log("Update cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// get all cart items
router.get("/getAll", validateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all cart items for the user
    const cart = await cartModel.find({ userId });

    // Create an array of promises for fetching product details
    const productPromises = cart.map(async (item) => {
      const product = await productModel.findOne({ _id: item.productId });
      return { ...item.toObject(), details: product }; // Combine cart item with product details
    });

    // Use Promise.all to wait for all product details to be fetched
    const cartWithDetails = await Promise.all(productPromises);
    return res.status(200).send(cartWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// delete cart item
router.delete("/delete/:id", validateUser, async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Delete cart item successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
