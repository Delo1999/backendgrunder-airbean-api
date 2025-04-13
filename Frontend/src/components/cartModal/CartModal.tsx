import "./cartModal.css";
import Button from "../button/button";
import CartModalOrderItem from "../cartModalOrderItem/CartModalOrderItem";
import { Item } from "../../types/types";
import { NavigateFunction } from "react-router";

type CartModalProps = {
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
  postRequest: () => void;
  itemCartAdd: (id: string) => void;
  itemCartRemove: (id: string) => void;
  itemCartDelete: (id: string) => void;
  navigate: NavigateFunction;
};
const CartModal: React.FC<CartModalProps> = ({
  cart,
  setCart,
  postRequest,
  itemCartAdd,
  itemCartRemove,
  itemCartDelete,
  navigate,
}) => {
  // navigera till "status" efter order är lagd.
  const bryggKaffe = cart.find((item) => item.title === "Bryggkaffe");
  const bakelse = cart.find((item) => item.title === "Gustav Adolfsbakelse");

  const kaffeAntal = bryggKaffe ? bryggKaffe.antal : 0;
  const bakelseAntal = bakelse ? bakelse.antal : 0;

  const prisRabatt = Math.min(kaffeAntal, bakelseAntal);

  const total = cart.reduce((sum, item) => {
    if (item.title === "Bryggkaffe") {
      const rabattKaffe = Math.min(prisRabatt, item.antal);
      const kaffeKvar = item.antal - rabattKaffe;
      return sum + kaffeKvar * item.price;
    }
    if (item.title === "Gustav Adolfsbakelse") {
      const rabattBakelse = Math.min(prisRabatt, item.antal);
      const bakelseKvar = item.antal - rabattBakelse;
      return sum + rabattBakelse * 40 + bakelseKvar * item.price;
    }
    return sum + item.price * item.antal;
  }, 0);

  // const total = cart.reduce((sum, current) => sum + current.price * current.antal, 0);

  // fixar en totalt på allt man lägger till
  console.log(
    "cart i cartmodala fixed antal:",
    cart.map((item) => item.antal)
  );

  return (
    <section className="cartModal">
      <section className="cartModal__inner-container">
        <h1 className="cartModal__header">Din beställning</h1>
        <div className="cartModal__tip"></div>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <CartModalOrderItem
                key={item.id}
                item={item}
                itemCartAdd={itemCartAdd}
                itemCartRemove={itemCartRemove}
                itemCartDelete={itemCartDelete}
              />
            ))}
            <section className="cartModal__wrapper">
              <section className="cartModal__price-section">
                <h2 className="cartModal__lower-header">Total </h2>
                <h2 className="cartModal__dots"></h2>
                <p className="cartModal__price">{total} SEK</p>
              </section>
              <p className="cartModal__price-off">
                Rabatt {prisRabatt * 49} SEK
              </p>
              <p className="cartModal__extra-info-secction">
                inkl moms + drönarleverans
              </p>

              <section className="cartModal__btn-wrapper">
                <Button
                  onClick={() => {
                    postRequest();
                    setCart([]);
                    navigate("/status");
                  }}
                  bgColor={"rgba(47, 41, 38, 1)"}
                  color={" rgba(255, 255, 255, 1)"}
                >
                  Take my money!
                </Button>
              </section>
            </section>
          </>
        ) : (
          <p className="cartModal__empty">Din kundvagn är tom</p>
        )}
      </section>
    </section>
  );
};

export default CartModal;
