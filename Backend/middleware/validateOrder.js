import { menuDB } from "../db.js";

export async function validateOrder(req, res, next) {
    const { details } = req.body;
    
    if (!details || !details.userId || !details.order) {
        return res.status(400).json({ message: "Invalid order format" });
    }

    try {
        // Checka så att produkterna finns i menyn
        const menuCheck = await Promise.all(
            details.order.map(async (product) => {
                const menuItem = await menuDB.findOne({ 
                    title: product.name 
                });
                return !!menuItem;
            })
        );

        if (menuCheck.includes(false)) {
            return res.status(400).json({ message: "Some products not found in menu" });
        }

        // checka så pris stämmer.
        const priceCheck = await Promise.all(
            details.order.map(async (product) => {
                const menuItem = await menuDB.findOne({ 
                    title: product.name, 
                    price: product.price
                });
                return !!menuItem;
            })
        );

        if (priceCheck.includes(false)) {
            return res.status(400).json({ message: "Price mismatch for some items" });
        }

        next();
    } catch (error) {
        console.error("Order validation error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}