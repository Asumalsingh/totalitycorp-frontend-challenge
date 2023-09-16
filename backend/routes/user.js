import express from "express";
const router = express.Router();
import UserModel from "../models/userModel.js";
import validateUser from "../middlewares/validateUser.js";

// Get user data : "user/getUser"
router.get("/getUser", validateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
