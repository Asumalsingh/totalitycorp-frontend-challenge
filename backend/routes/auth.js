import express from "express";
const router = express.Router();
import { validationResult, body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";

// Create a user using post : "auth/signUp"
router.post(
  "/signUp",
  [
    body("name", "Name should contains at least 3 letters").isLength({
      min: 3,
    }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password should contains 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // check input is correct or not
    const errors = validationResult(req);
    // this errors handling is for validation
    if (!errors.isEmpty()) {
      const error = {
        message: errors.errors[0].msg,
      };
      return res.status(400).send(error);
    }

    const { name, email, password } = req.body;
    try {
      // check whether email exist or not
      let user = await UserModel.findOne({ email });
      // if email exist, then send a bad request
      if (user) {
        return res.status(400).send({
          success,
          message: "Email is already exist, try with another email",
        });
      }

      // password hashing
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);

      // Otherwise create new user
      user = new UserModel({
        name,
        email,
        password: hash,
      });
      await user.save();

      const data = {
        id: user.id,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(201).json({ success, authToken });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

// login : "auth/login"
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password should contains 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // check input is correct or not
    const errors = validationResult(req);
    // this errors handling is for validation
    if (!errors.isEmpty()) {
      const error = {
        message: errors.errors[0].msg,
      };
      return res.status(400).send(error);
    }
    const { email, password } = req.body;
    try {
      // check whether user exist or not
      let user = await UserModel.findOne({ email });
      // if user does not exist, then send a bad request
      if (!user) {
        return res.status(400).send({
          success,
          message: "Please try to login with correct credentials",
        });
      }

      // check has password is matched or not
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          success,
          message: "Please try to login  with correct credentials",
        });
      }

      // If user exist
      const data = {
        id: user.id,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
