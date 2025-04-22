import { NavLink } from "react-router";
import "./NavbarModal.css";

interface NavbarModalProps {
  handleBurgerMenu: () => void;
}
const NavbarModal = ({ handleBurgerMenu }: NavbarModalProps) => {
  return (
    // måste få de o stänga när de trycker på link
    <section className="navbarModal">
      <ul className="navbarModal__ul">
        <li className="navbarModal__list">
          <NavLink
            to="/"
            className="navbarModal__link"
            onClick={handleBurgerMenu}
          >
            Meny
          </NavLink>

          <section className="navbarModal__border"></section>
        </li>
        <li className="navbarModal__list">
          <NavLink
            onClick={handleBurgerMenu}
            to="/about"
            className="navbarModal__link"
          >
            Vårt kaffe
          </NavLink>
          <section className="navbarModal__border"></section>

          <li className="navbarModal__list">
            <NavLink
              onClick={handleBurgerMenu}
              to="/profile"
              className="navbarModal__link"
            >
              Min Profil
            </NavLink>
          </li>

          <section className="navbarModal__border"></section>
        </li>
        <li className="navbarModal__list">
          <NavLink
            onClick={handleBurgerMenu}
            to="/status"
            className="navbarModal__link"
          >
            Orderstatus
          </NavLink>
          <section className="navbarModal__border"></section>
        </li>
      </ul>
    </section>
  );
};

export default NavbarModal;
