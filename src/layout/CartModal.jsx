import { useContext, useEffect } from "react";
import { Link } from "react-router";

import { AppContext } from "../context/AppContext";

import Cart from "../elements/cart/Cart";
import EmptyCart from "../elements/cart/EmptyCart";

import CloseIcon from "../assets/icons/close.svg";

function CartModal() {
  const { cartModalOpen, setCartModalOpen, cart } = useContext(AppContext);

  const cartItemCount =
    cart.length &&
    cart.map((el) => el.quantity).reduce((acc, curr) => acc + curr); //refactor to oneline later

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
      <section className="absolute right-0 top-0 bottom-0 p-[40px] w-[540px] bg-white flex flex-col z-50">
        <div className="flex items-center justify-between mb-[60px]">
          <h2>Shopping cart ({cartItemCount})</h2>
          <button
            className="cursor-pointer"
            onClick={() => setCartModalOpen((p) => !p)}
          >
            <img src={CloseIcon} alt="close cart" />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 ">
          {!cart.length && <EmptyCart className="mt-[150px]"></EmptyCart>}
          {cart.length >= 1 && (
            <>
              <Cart></Cart>
              <Link
                className="cursor-pointer bg-main-red flex justify-center items-center gap-[10px] text-white font-medium p-[16px] rounded-[10px]"
                to={"/checkout"}
                onClick={() => setCartModalOpen(false)}
              >
                Go to checkout
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default CartModal;
