import express from "express";
const router = express.Router();
import stripe from "stripe";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
const stripeInstance = stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const cartMetaData = products.map((product) => ({
    cartId: product._id,
    productId: product.productId,
    quantity: product.quantity,
  }));

  const customer = await stripeInstance.customers.create({
    metadata: {
      userId: products[0].userId,
      cart: JSON.stringify(cartMetaData),
    },
  });

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.details.name,
        images: [product.details.image.url],
      },
      unit_amount: product.details.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "IN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items: lineItems,
    mode: "payment",
    success_url: `${CLIENT_URL}/profile`,
    cancel_url: `${CLIENT_URL}/cancel`,
  });

  res.status(200).json({ id: session.id });
});

// Create order
const createOrder = async (customer, data) => {
  const metaData = JSON.parse(customer.metadata.cart);
  const userId = customer.metadata.userId;

  const productPromises = metaData.map(async (item) => {
    // Delete cart
    await cartModel.findByIdAndDelete(item.cartId);

    // Find details of ordered product
    const product = await productModel.findById(item.productId);

    return {
      productId: product._id,
      name: product.name,
      image: product.image.url,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const products = await Promise.all(productPromises);

  const newOrder = new orderModel({
    userId,
    stripeCustomerId: customer.id,
    paymentIntentId: data.payment_intent,
    products,
    totalAmount: data.amount_total / 100,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripeInstance.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

export default router;
