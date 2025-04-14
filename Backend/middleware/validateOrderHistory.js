export function validateOrderHistory(req, res, next) {
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).send({ message: "Order ID is required" });
  }

  next();
}
