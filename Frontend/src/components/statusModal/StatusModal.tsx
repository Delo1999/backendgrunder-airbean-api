import "./StatusModal.css";
import orderstatusimage from "../../assets/orderstatusimage.svg";
import Button from "../button/button";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

interface OutletContextType {
  orderNr: string | null;
}

interface OrderStatus {
  eta: string;
  status: string;
}

const StatusModal = () => {
  const { orderNr } = useOutletContext<OutletContextType>();
  const nav = useNavigate();

  const [eta, setEta] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [emptyOrder, setEmptyOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderNr) {
        setEmptyOrder(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/order/status/${orderNr}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order status");
        }

        const data: OrderStatus = await response.json();

        if (!data || !data.eta) {
          setEmptyOrder(true);
          return;
        }

        setEta(data.eta);
        setStatus(data.status);
        setEmptyOrder(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setEmptyOrder(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderNr]);

  if (loading) {
    return (
      <section className="status-modal">
        <p>Loading order status...</p>
      </section>
    );
  }

  if (emptyOrder || error) {
    return (
      <section className="status-modal">
        <p className="status-modal__order-number">
          {error || "Please place an order in our shop."}
        </p>
        <h1 className="status-modal__info">No active order found</h1>

        <Button
          onClick={() => nav("/")}
          bgColor={"rgba(255, 255, 255, 1)"}
          color={"rgba(47, 41, 38, 1)"}
        >
          Back to Menu
        </Button>
      </section>
    );
  }

  return (
    <section className="status-modal">
      <p className="status-modal__order-number">Order #{orderNr}</p>
      <img className="status-modal__img" src={orderstatusimage} alt="drone" />
      <h1 className="status-modal__info">
        Your order <br /> is on its way!
      </h1>
      <section className="status-modal__time-wrapper">
        <span className="status-modal__time">{eta}</span>
        <p className="status-modal__minutes">minutes</p>
      </section>
      <section className="status-modal__status-wrapper">
        <p>Status: {status}</p>
      </section>

      <Button
        onClick={() => nav("/")}
        bgColor={"rgba(255, 255, 255, 1)"}
        color={"rgba(47, 41, 38, 1)"}
      >
        Back to Menu
      </Button>
    </section>
  );
};

export default StatusModal;