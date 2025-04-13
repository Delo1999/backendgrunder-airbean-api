import express from "express";
import { db } from "./db.js";
import { validateUserData } from "./middleware/validateUserData.js";
import Crypto from "crypto";
import { validateOrder } from "./middleware/validateOrder.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", validateUserData, async (req, res) => {
  const user = await db.find({ username: req.body.username });

  if (user.length > 0) {
    return res.status(400).send({ message: "User already exists" });
  }

  await db.insert({
    username: req.body.username,
    password: req.body.password,
    id: Crypto.randomUUID(),
  });

  return res.status(201).send({ message: "User registered successfully" });
});

app.post("/api/login", validateUserData, async (req, res) => {
  const user = await db.find({
    username: req.body.username,
    password: req.body.password,
  });

  if (user.length === 0) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  return res
    .status(200)
    .send({ message: "Login successful", userId: user[0].id });
});

app.post("/api/order", validateOrder, async (req, res) => {
  // Kolla att produkterna finns i menyn
  // Kontrollera priset att det stämmer
  const order = req.body.details.order;
  console.log(order);

  await db.insert({
    order: order,
    userId: req.body.details.userId,
    id: Crypto.randomUUID(),
  });

  return res.status(200).send({ message: "Order placed successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
