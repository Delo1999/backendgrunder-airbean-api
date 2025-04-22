import { menu } from "../constants/menu.js";

export function validateOrder(req, res, next) {
  const order = req.body.details.order;

  const isEveryProductInMenu = order.every((product) => {
    return menu.some((menuItem) => menuItem.title === product.name);
  });

  if (!isEveryProductInMenu) {
    return res
      .status(400)
      .send({ message: "Some products are not in the menu" });
  }

  const isEveryPriceCorrect = order.every((product) => {
    const menuItem = menu.find((menuItem) => menuItem.title === product.name);
    return menuItem && menuItem.price === product.price;
  });

  if (!isEveryPriceCorrect) {
    return res.status(400).send({ message: "Some prices are incorrect" });
  }

  next();
}
