import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import NavbarModal from "./components/navbarModal/NavbarModal";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./components/footer/Footer";
import CartModal from "./components/cartModal/CartModal";
import { Item } from "./types/types";
import HomePage from "./pages/landingPage/landing";

function App() {
  // usestage för o hantera true & false för menyn
  const [handleToggle, setHandleToggle] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState<Item[]>([]);
  const [home, setHome] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setCartModal(false);
    setHandleToggle(false);
  }, [location]);

  //togglar menyn false true
  const handleBurgerMenu = () => {
    setHandleToggle((prev) => {
      console.log(handleToggle);
      setCartModal(false);
      return !prev;
    });
  };
  //togglar cartModal false true
  const handleCartModal = () => {
    setCartModal((prev) => {
      return !prev;
    });
  };

  //fixade med outlet med och skicka props via useoutletcontext på menupage

  const handleUpdateCart = (item: Item) => {
    //kollar om obj finns i array:
    const itemExists = cart.find((Item) => {
      return Item.title === item.title;
    });
    if (itemExists) {
      console.log("item exists");

      console.log("uppdaterad cartt", cart);

      setCart((prevCart) =>
        prevCart.map((Item) =>
          Item.title === item.title
            ? { ...Item, antal: Item.antal + 1 } // Rätt sätt att uppdatera antal
            : Item
        )
      );
    } else {
      console.log("item NOT! exists");

      // Om objektet inte finns, lägg till det med antal: 1
      setCart((prevCart) => [...prevCart, { ...item, antal: 1 }]);
    }
  };

  console.log("uppdatterad meny", cart);

  const [orderNr, setOrderNr] = useState();

  const postRequest = async () => {
    console.log("cart:", cart);

    const postCart = {
      details: {
        order: cart.map((item) => {
          return {
            name: item.title,
            price: item.price,
          };
        }),
      },
    };
    console.log("postcard", postCart);

    const url = "https://airbean-9pcyw.ondigitalocean.app/api/beans/order";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postCart),
      });

      // Vänta på att servern svarar och returnera svaret i JSON-format
      const data = await response.json();

      setOrderNr(data.orderNr);
      console.log("ordernr!!!", data.orderNr);

      if (!response.ok) {
        // Hantera eventuella fel här om svaret inte var ok
        throw new Error(`Error: ${data.message || "Something went wrong"}`);
      }

      console.log("User created successfully:", data); // Hantera den skapade användaren
    } catch (error) {
      console.error("Error creating user:", error); // Hantera fel om något går fel
    }
  };

  const increaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, antal: item.antal + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.antal > 1
          ? { ...item, antal: item.antal - 1 }
          : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClick = () => {
    setHome(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <section className="app-wrapper">
        {location.pathname !== "/status" && (
          <Navbar
            cart={cart}
            handleBurgerMenu={handleBurgerMenu}
            handleCartModal={handleCartModal}
            handleToggle={handleToggle}
          />
        )}

        {cartModal && (
          <CartModal
            navigate={navigate}
            setCart={setCart}
            postRequest={postRequest}
            cart={cart}
            itemCartAdd={increaseQuantity}
            itemCartRemove={decreaseQuantity}
            itemCartDelete={deleteItem}
          />
        )}

        {handleToggle && <NavbarModal handleBurgerMenu={handleBurgerMenu} />}
        {home && <HomePage handleClick={handleClick} home={home} />}
        <Outlet
          context={{ handleUpdateCart: handleUpdateCart, orderNr: orderNr }}
        />
        {location.pathname !== "/status" && !home && <Footer />}
      </section>
    </>
  );
}

export default App;
