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
  // State för hantera menu toggle, cart modal, cart items och home page view
  const [handleToggle, setHandleToggle] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState<Item[]>([]);
  const [home, setHome] = useState(true);
  const [userId, setUserId] = useState<string | null>(null); 
  const [orderNr, setOrderNr] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    // hämta userId från localStorage när komponenten mountas
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !userId) {
      setUserId(storedUserId); // Sett userId om det inte redan är satt
    }

    setCartModal(false);
    setHandleToggle(false);
  }, [location, userId]);

  // hantera toggle av burger menu
  const handleBurgerMenu = () => {
    setHandleToggle((prev) => {
      setCartModal(false);
      return !prev;
    });
  };

  // hantera toggle av cart modal
  const handleCartModal = () => {
    setCartModal((prev) => !prev);
  };

  // updatera cart med item
  const handleUpdateCart = (item: Item) => {
    const itemExists = cart.find((Item) => Item.title === item.title);
    if (itemExists) {
      setCart((prevCart) =>
        prevCart.map((Item) =>
          Item.title === item.title
            ? { ...Item, antal: Item.antal + 1 }
            : Item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, antal: 1 }]);
    }
  };

  // Post order request
  const postRequest = async () => {
    if (!userId) {
      console.error("User ID is required to place an order");
      return;
    }

    const postCart = {
      details: {
        userId,
        order: cart.map((item) => ({
          name: item.title,
          price: item.price,
        })),
      },
    };

    const url = "http://localhost:8000/api/order"; 
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postCart),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderNr(data.orderId); 
        console.log("Order placed successfully:", data);
        setCart([]);
        navigate("/status");
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating order:", error);
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
        
        {home && <HomePage handleClick={() => setHome(false)} />}
        
        <Outlet context={{ handleUpdateCart, orderNr }} />

        {location.pathname !== "/status" && !home && <Footer />}
      </section>
    </>
  );
}

export default App;
