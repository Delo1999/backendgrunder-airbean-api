import { Item } from "../../types/types";
import "./CartModalOrderItem.css";
import { AiOutlineDelete } from "react-icons/ai";
type CartModalOrderItemProps = {
  item: Item;
  itemCartAdd: (id: string) => void;
  itemCartRemove: (id: string) => void;
  itemCartDelete: (id: string) => void;
};

const CartModalOrderItem = ({ item, itemCartAdd, itemCartRemove, itemCartDelete  }: CartModalOrderItemProps) => {
  return (
    <section className="order-item">
      <section className="order-item__wrapper">
        <h1 className="order-item__type">{item.title}</h1>
        <h1 className="order-item__dots"></h1>
        <section className="order-item__select-wrapper">
          <div className="order-item__btn" onClick={() => itemCartRemove(item.id)}>-</div>
          <div className="order-item__amount">{item.antal}</div>
          <div className="order-item__btn" onClick={() => itemCartAdd(item.id)}>+</div>
          <div className="order-item__trash" onClick={() => itemCartDelete(item.id)}>
            <AiOutlineDelete />
          </div>
        </section>
      </section>
      <p className="order-item__price">{item.price * item.antal} SEK</p>
    </section>
  );
};

export default CartModalOrderItem;
