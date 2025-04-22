import React, { useEffect, useState } from "react";
import "./userprofile.scss";

interface Product {
  name: string;
  price: number;
  quantity?: number;
}

interface Order {
  orderId: string;
  _id?: string;
  items: Product[];
  status: string;
  eta: string;
  createdAt?: string;
}

interface UserProfileProps {
  userId: string;
  username: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, username, onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:8000/api/order-history?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? "No orders found" 
              : "Failed to fetch orders"
          );
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid orders data received");
        }

        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (isLoading) {
    return <div>Laddar ordrar...</div>;
  }

  if (error) {
    return (
      <div className="profile__container">
        <section className="profile__container__frame">
          <h2 className="profile__container__frame__title">Min profil</h2>
          <p className="profile__container__frame__Error">Error: {error}</p>
          <button className="profile__container__frame__btn" onClick={onLogout}>Logga ut</button>
        </section>
        
      </div>
    );
  }

  return (
    <div className="profile__container">
      <section className="profile__container__frame">
        <h2 className="profile__container__frame__title">Min profil</h2>
        <p className="profile__container__frame__username">Användarnamn: {username}</p>
        <p className="profile__container__frame__userid">Användar-ID: {userId}</p>
        <button className="profile__container__frame__btn" onClick={onLogout}>Logga ut</button>
      </section>
   
     <section className="profile__container__order">
      <h3 className="profile__container__order__title">Mina orders:</h3>
        {orders.length === 0 ? (
          <p className="profile__container__order__info">Inga tidigare beställningar</p>
        ) : (
          <ul className="profile__container__orders__list">
            {orders.map((order) => (
              <li key={order.orderId || order._id} className="profile__container__order__item">
                <strong>Beställning #{order.orderId}</strong>
                <p>Status: {order.status}</p>
                <p>Beräknad leveranstid: {order.eta} minuter</p>
                <p>Datum: {new Date(order.createdAt || "").toLocaleString()}</p>
                <ul className="order-items">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} - {item.price} kr
                      {item.quantity && ` (${item.quantity} st)`}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section> 

    </div>
  );
};

export default UserProfile;