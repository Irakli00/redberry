import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router";

function CartModal() {
  const { cartModalOpen, setCartModalOpen, cart } = useContext(AppContext);
  const totalPrice = cart
    .map((el) => el.price)
    .reduce((acc, curr) => acc + curr, 0);
  useEffect(() => {
    if (cartModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartModalOpen]);

  if (!cartModalOpen) return null;

  return (
    <>
      <div
        className="absolute left-0 right-[540px] top-0 bottom-0 bg-black/25"
        aria-label="Close cart"
        onClick={() => setCartModalOpen(false)}
      />
      <section className="absolute right-0 top-0 bottom-0 p-[40px] w-[540px] bg-white flex flex-col">
        <div className="flex items-center justify-between mb-[60px]">
          <h2>Shopping cart ({cart.length})</h2>
          <button
            className="cursor-pointer"
            onClick={() => setCartModalOpen((p) => !p)}
          >
            X
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <ul className="flex-1 overflow-y-auto">
            {" "}
            {cart.map((el) => (
              <li key={el.id} className="flex gap-[17px] mb-4">
                <img
                  className="w-[100px] h-[134px]"
                  src={el.cover_image}
                  alt={el.name}
                />
                <div className="flex flex-col flex-1 gap-[8px]">
                  <div className="flex justify-between">
                    <h4 className="text-[14px] font-medium">{el.name}</h4>
                    <p className="text-[18px]">$ {el.price}</p>
                  </div>
                  <p className="text-dark-blue">{el.color}</p>
                  <p>{el.size}</p>
                  <div className="flex justify-between">
                    <div className="max-w-[70px] flex justify-around items-center gap-[9px] border border-light-gray rounded-[22px] px-[11px] py-[6px]">
                      <button disabled={el.quantity <= 1}>-</button>
                      <p>{el.quantity}</p>
                      <button>+</button>
                    </div>
                    <button className="cursor-pointer font-normal text-dark-blue">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <article className="flex flex-col gap-[16px] ">
            <p className="flex justify-between text-dark-blue">
              <span>Items subtotal:</span>
              <span>${cart.length > 0 ? totalPrice : 0}</span>
            </p>
            <p className="flex justify-between  text-dark-blue">
              <span>Delivery:</span>
              <span>$ 5</span>
            </p>
            <p className="flex justify-between text-[20px] font-medium">
              <span>Total:</span>
              <span>$ {totalPrice + 5}</span>
            </p>
          </article>

          <Link
            className="cursor-pointer bg-main-red flex justify-center items-center gap-[10px] text-white font-medium mt-[100px] p-[16px] rounded-[10px]"
            to={"/products"}
            onClick={() => setCartModalOpen(false)}
          >
            Go to checkout
          </Link>
        </div>
      </section>
    </>
  );
}

export default CartModal;
