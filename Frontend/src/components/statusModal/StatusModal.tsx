import "./StatusModal.css";
import orderstatusimage from "../../assets/orderstatusimage.svg";
import Button from "../button/button";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

interface OutletContextType {
  orderNr: string;
}
const StatusModal = () => {
  const { orderNr } = useOutletContext<OutletContextType>();
  const nav = useNavigate();

  const [eta, setEta] = useState<{ eta: number } | null>(null);
  const [emptyOrder, setEmptyOrder] = useState(false);
  console.log("order", orderNr);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://airbean-9pcyw.ondigitalocean.app/api/beans/order/status/${orderNr}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Konverterar svaret till JSON

        if (!data || !data.eta) {
          setEmptyOrder(true);
          return;
        }

        setEta(data);
        setEmptyOrder(false);
        console.log("eta", data);
      } catch (error) {
        console.error("Error:", error); // Hantera eventuella fel
        setEmptyOrder(true);
      }
    };

    fetchData(); // Anropa funktionen för att hämta data
  }, [orderNr]);

  if (emptyOrder) {
    return (
      <section className="status-modal">
        <p className="status-modal__order-number">
          Var god och gör en beställning i vår shop.
        </p>
        <h1 className="status-modal__info">Du har ingen aktiv beställning</h1>

        <Button
          onClick={() => {
            nav("/");
          }}
          bgColor={"rgba(255, 255, 255, 1)"}
          color={"rgba(47, 41, 38, 1)"}
        >
          Ok, cool!
        </Button>
      </section>
    );
  }

  return (
    <section className="status-modal">
      <p className="status-modal__order-number">Ordernummer {orderNr}</p>
      <img className="status-modal__img" src={orderstatusimage} alt="drone" />
      <h1 className="status-modal__info">
        Din beställning <br /> är på väg!
      </h1>
      <section className="status-modal__time-wrapper">
        <span className="status-modal__time">{eta && eta.eta}</span>

        <p className="status-modal__minutes">minuter</p>
      </section>

      <Button
        onClick={() => {
          nav("/");
        }}
        bgColor={"rgba(255, 255, 255, 1)"}
        color={"rgba(47, 41, 38, 1)"}
      >
        Ok, cool!
      </Button>
    </section>
  );
};

export default StatusModal;
