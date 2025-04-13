import "./Navbar.scss";
import Hamburger from "hamburger-react";

import { BsFillHandbagFill } from "react-icons/bs";
import {Item } from "../../types/types";

interface NavbarProps {
  handleBurgerMenu: () => void;
  handleCartModal: () => void;
  cart: Item[];
  handleToggle: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleBurgerMenu, handleCartModal, cart, handleToggle  }) => {
  
  const totalItems = cart.reduce((total, cartItem) => total + cartItem.antal, 0);
  
  return (
    <nav className="navbar">
      <section className="navbar__burger-wrapper">
      <Hamburger toggled={handleToggle} toggle={handleBurgerMenu} />
      </section>
      <section className="navbar__basket" onClick={handleCartModal}>
        <section className="navbar__cart-count">{totalItems}</section>
        <section className="navbar__icon-wrapper">
          <BsFillHandbagFill className="navbar__icon" />
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
