import express from "express";
const router = express.Router();
import productModel from "../models/productModel.js";
import validateUser from "../middlewares/validateUser.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add product at "product/addProduct"
router.post("/addProduct", validateUser, async (req, res) => {
  // Check that user is admin or not, because only admin can add product
  const user = await userModel.findById(req.user.id);
  if (!user.isAdmin)
    return res.status(403).send({ message: "Only admin allowed" });

  const { categories, name, type, size, price, image } = req.body;

  try {
    // Upload image on cloudinary
    const uploadImg = await cloudinary.uploader.upload(image, {
      upload_preset: "ak-store",
    });

    // Create post
    const product = new productModel({
      name,
      categories,
      type,
      size,
      price,
      image: { id: uploadImg.public_id, url: uploadImg.secure_url },
    });
    const savedPost = await product.save();

    res.status(201).send(savedPost);
    //
  } catch (error) {
    res.status(500).send({ error, message: "Internal server error" });
  }
});

// Get all product at "product/all"
router.get("/all", async (req, res) => {
  const { collection, productType, size, price } = req.query;
  let filter = {};
  // filter for categories (mens, womens)
  if (collection) filter.categories = { $in: collection };
  // filter for product type
  if (productType) {
    filter.type = { $in: productType };
  }
  // filter for size
  if (size) filter.size = { $in: size };
  // filter for price
  if (price) filter.price = { $gte: Number(price[0]), $lte: Number(price[1]) };

  try {
    const products = await productModel.find({
      $and: [filter],
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error, message: "Internal server error" });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Internal server error" });
  }
});

router.put("/up", async (req, res) => {
  const data = [
    {
      _id: "6440fbcf6aed0b03e305ae2f",
      name: "gray-avenge-hoodie",
    },
    {
      _id: "6440fcac6aed0b03e305ae32",
      name: "multi-colour-hoodie",
    },
    {
      _id: "6440fcd86aed0b03e305ae35",
      name: "gradient-hoodi",
    },
    {
      _id: "6440fd046aed0b03e305ae38",
      name: "wwe-hoodie",
    },
    {
      _id: "6440fd2e6aed0b03e305ae3b",
      name: "blue-sport-jogger",
    },
    {
      _id: "6440fd556aed0b03e305ae3e",
      name: "gray-casual-jogger",
    },
    {
      _id: "6440fe5d6aed0b03e305ae43",
      name: "jogger",
    },
    {
      _id: "6440fe916aed0b03e305ae46",
      name: "stylish-men's-jogger",
    },
    {
      _id: "6440fee26aed0b03e305ae49",
      name: "pink-shirt",
    },
    {
      _id: "6440ff156aed0b03e305ae4c",
      name: "checks-blue-shirt",
    },
    {
      _id: "6440ff466aed0b03e305ae4f",
      name: "white-shirt-with-lines",
    },
    {
      _id: "6440ff676aed0b03e305ae52",
      name: "cool-shirt",
    },
    {
      _id: "6440ff986aed0b03e305ae55",
      name: "light-green-tshirt",
    },
    {
      _id: "6441009d6aed0b03e305ae5b",
      name: "black-collar-tshirt",
    },
    {
      _id: "644100d66aed0b03e305ae5e",
      name: "oversize-printed-tshirt",
    },
    {
      _id: "644101086aed0b03e305ae61",
      name: "oversize-orange-tshirt",
    },
    {
      _id: "644102ad6aed0b03e305ae64",
      name: "crop-top-v-shaped",
    },
    {
      _id: "644102d76aed0b03e305ae67",
      name: "army-colour-top",
    },
    {
      _id: "644102fa6aed0b03e305ae6a",
      name: "multicolour-top",
    },
    {
      _id: "6441031f6aed0b03e305ae6d",
      name: "black-top",
    },
    {
      _id: "6441034b6aed0b03e305ae70",
      name: "oversize-tshirt-for-girls",
    },
    {
      _id: "6441036d6aed0b03e305ae73",
      name: "black-tshirt-for-girls",
    },
    {
      _id: "6441039c6aed0b03e305ae76",
      name: "maroon-tshirt-for-girls",
    },
    {
      _id: "644103c26aed0b03e305ae79",
      name: "purple-tshirt",
    },
  ];

  try {
    for (let i = 0; i < data.length; i++) {
      const update = await productModel.findByIdAndUpdate(data[i]._id, {
        $set: { name: data[i].name },
      });
    }

    const d = await productModel.find().select("name");
    res.send(d);
  } catch (error) {
    res.send(error);
  }
});

// router.get("/get", async (req, res) => {
//   const p = await productModel.find().select("mrp");
//   res.send(p);
// });

export default router;
