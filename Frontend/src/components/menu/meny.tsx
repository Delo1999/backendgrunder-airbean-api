import React, { useState, useEffect } from "react";
import "./Meny.scss";
import { useOutletContext } from "react-router";
export interface MenuItem {
  id: string;
  title: string;
  desc: string;
  price: number;
}

interface MenuResponse {
  menu: MenuItem[];
}

export const MenuList: React.FC = () => {
  const { handleUpdateCart } = useOutletContext<{
    handleUpdateCart: (item: MenuItem) => void;
  }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/menu",
        );
        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        const data: MenuResponse = await response.json();
        setMenuItems(data.menu);
      } catch (err) {
        setError("Fel vid hämtning av menyn.");
        console.error("Fel vid hämtning av menyn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p className="loading__p">LADDAR.....</p>
      </div>
    );
  }

if (error) {
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
}

  return (
    <div className="menu-container">
      <div className="menu">
        <h1>Meny</h1>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <div className="menu-item-header">
                <div
                  className="plus-button"
                  onClick={() => {
                    handleUpdateCart(item);
                    console.log(item);
                  }}
                >
                  +
                </div>
                <span className="item-name">{item.title}</span>
                <span className="dots"></span>
                <span className="item-price">{item.price} kr</span>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
            </li>
          ))}
        </ul>
        <section className="box-price">
        <div className="diff-price">
          <h2>Dagens Erbjudande:</h2>
        <p>köp en Bryggkaffe och en Gustav Adolfsbakelse för endast 40 sek!</p>
        </div>
        </section>
      </div>
    </div>
  );
};

