// =======================
// STARTUP LOG
// =======================
console.log("🚀 Starting server...");

// =======================
// ENV
// =======================
require("dotenv").config();

// =======================
// Imports
// =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");
const jwt = require("jsonwebtoken");

// =======================
// App Init
// =======================
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY missing in .env");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// =======================
// Middleware
// =======================
app.use(cors());

// ⚠️ Stripe Webhook MUST use RAW body
app.use("/webhook", express.raw({ type: "application/json" }));

// Normal JSON for all other routes
app.use(express.json());

// =======================
// Models
// =======================
require("./Users-module/users-module");
require("./Users-module/Employee");
const Order = require("./Users-module/order");

// =======================
// Routes
// =======================

// Cart Routes
try {
  const cartRoutes = require("./routes/cart");
  app.use("/api/cart", cartRoutes);
  console.log("✅ Cart routes loaded");
} catch (err) {
  console.error("❌ Cart routes failed:", err.message);
}

// Admin Orders Routes
try {
  const adminOrdersRoutes = require("./routes/adminordes");
  app.use("/admin", adminOrdersRoutes);
  console.log("✅ Admin routes loaded");
} catch (err) {
  console.error("❌ Admin routes missing:", err.message);
}

// Invoice Route
try {
  app.use("/", require("./routes/invoice"));
  console.log("✅ Invoice routes loaded");
} catch (err) {
  console.error("❌ Invoice route error:", err.message);
}

// =======================
// Auth
// =======================
const EmployeeModel = require("./Users-module/Employee");

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No record existed" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const userPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: userPayload });
  } catch (err) {
    res.status(500).json({ error: err.message || "Login failed" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);

    const userPayload = {
      id: employee._id,
      name: employee.name,
      email: employee.email,
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: userPayload });
  } catch (err) {
    res.status(500).json({ error: err.message || "Registration failed" });
  }
});

// =======================
// Stripe Checkout
// =======================
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: "No items provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty || 1,
    }));

    // Total amount in cents (required by Order schema)
    const amount = items.reduce(
      (sum, item) => sum + Math.round((item.price || 0) * 100) * (item.qty || 1),
      0
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    await Order.create({
      stripeSessionId: session.id,
      amount,
      status: "pending",
      items: items.map((item) => ({
        productId: String(item.id),
        name: item.title,
        price: Math.round((item.price || 0) * 100),
        quantity: item.qty || 1,
      })),
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Stripe Webhook
// =======================
app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    Order.findOneAndUpdate(
      { stripeSessionId: event.data.object.id },
      { status: "paid" }
    ).exec();
  }

  res.json({ received: true });
});

// =======================
// Mongo + Server
// =======================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });
