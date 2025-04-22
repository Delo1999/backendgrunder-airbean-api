export function validateOrderHistory(req, res, next) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  next();
}