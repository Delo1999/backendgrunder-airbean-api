import React, { useEffect, useState } from "react";

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
      <div className="profile-container">
        <h2>Min profil</h2>
        <p>Error: {error}</p>
        <button onClick={onLogout}>Logga ut</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Min profil</h2>
      <p>Användarnamn: {username}</p>
      <p>Användar-ID: {userId}</p>
      <button onClick={onLogout}>Logga ut</button>
      
      <h3>Mina orders:</h3>
      {orders.length === 0 ? (
        <p>Inga tidigare beställningar</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.orderId || order._id} className="order-item">
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
    </div>
  );
};

export default UserProfile;