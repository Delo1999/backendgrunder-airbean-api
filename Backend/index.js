import express from "express";
import { db, menuDB } from "./db.js";
import { validateUserData } from "./middleware/validateUserData.js";
import Crypto from "crypto";
import { validateOrder } from "./middleware/validateOrder.js";
import { validateOrderHistory } from "./middleware/validateOrderHistory.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

function generateETA() {
  return (Math.floor(Math.random() * 20) + 1).toString(); 
}

// Regga ny användare
app.post("/api/register", validateUserData, async (req, res) => {
  try {
    const existingUser = await db.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
      username: req.body.username,
      password: req.body.password,
      id: Crypto.randomUUID(),
      orders: [] 
    };

    await db.insert(newUser);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logga in användare
app.post("/api/login", validateUserData, async (req, res) => {
  try {
    const user = await db.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ 
      message: "Login successful", 
      userId: user.id 
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Skapa ny order
app.post("/api/order", validateOrder, async (req, res) => {
  try {
    const { details } = req.body;
    
    if (!details || !details.userId || !details.order) {
      return res.status(400).json({ message: "Invalid request format" });
    }

    // hitta användare
    const user = await db.findOne({ id: details.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderId = Crypto.randomUUID();
    const newOrder = {
      orderId,
      items: details.order,
      status: "In Progress",
      eta: generateETA(),
      createdAt: new Date().toISOString()
    };

    // Updatera användarens orderlista
    const updated = await db.update(
      { id: details.userId },
      { $push: { orders: newOrder } },
      { returnUpdatedDocs: true }
    );

    if (!updated) {
      throw new Error("Failed to update user with new order");
    }

    return res.status(201).json({
      orderId,
      eta: newOrder.eta,
      status: newOrder.status
    });

  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
});


// Få fram order.
app.get("/api/order/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const user = await db.findOne({ "orders.orderId": orderId });
    if (!user || !user.orders) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = user.orders.find(o => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ETA för beställning
    const etaMinutes = order.eta.includes("T") 
      ? Math.round((new Date(order.eta) - new Date()) / 60000)
      : order.eta;

    return res.status(200).json({ 
      eta: etaMinutes,
      status: order.status
    });
  } catch (error) {
    console.error("Order status error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Order historik
app.get("/api/order-history", validateOrderHistory, async (req, res) => {
  try {
    const { userId } = req.query;
    
    const user = await db.findOne({ id: userId });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.orders || user.orders.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(user.orders);
  } catch (error) {
    console.error("Order history error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/menu", async (req, res) => {
  try {
    const menuItems = await menuDB.find({});
    res.status(200).json({ menu: menuItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});