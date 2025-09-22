import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function CartModal() {
  const { cartModalOpen, setCartModalOpen, cart } = useContext(AppContext);
  if (!cartModalOpen) return;

  return (
    <section className="absolute right-0 top-0 bottom-0 p-[40px] w-[540px] bg-red-300">
      <div className="flex items-center justify-between  mb-[60px]">
        <h2>Shopping cart ({cart.length})</h2>
        <button
          className="cursor-pointer"
          onClick={() => setCartModalOpen((p) => !p)}
        >
          X
        </button>
      </div>

      <ul>
        {cart.map((el) => (
          <li key={el.id}>
            <img
              className="w-[100px] h-[134px]"
              src={el.cover_image}
              alt={el.name}
            />
            <div>
              <div>
                <h4>{el.name}</h4>
                <p>$ {el.price}</p>
              </div>
              <p>{el.size}</p>
              <p>{el.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CartModal;
