import { useContext, useRef } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppContext } from "../context/AppContext";

import { checkout } from "../services/cart";

import EmptyCart from "../elements/cart/EmptyCart";
import Cart from "../elements/cart/Cart";
import Button from "../elements/components/Button";

import EnvelopeIcon from "../assets/icons/envelope.svg";
import SuccessIcon from "../assets/icons/success.svg";
import CloseIcon from "../assets/icons/close.svg";

function Checkout() {
  const { user, cart } = useContext(AppContext);
  const formRef = useRef(null);
  const qClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
    // onError: (err) => setErrorMessage(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    mutate(data);
  }

  function handlePayClick() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <section className="mt-[72px] w-full">
      <h1 className="mb-[42px] font-semibold text-[42px] text-main-black">
        Checkout
      </h1>
      <section className="flex justify-between gap-[130px] ">
        <form
          ref={formRef}
          className="bg-[#F8F6F7] py-[72px] px-[42px] rounded-[16px] w-full max-w-[1120px]"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="font-medium text-dark-blue text-[22px] mb-[46px]">
              Order details
            </h2>
            <div className="max-w-[578px] flex flex-col gap-[33px]">
              <div className="flex gap-[24px]">
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="Name"
                  name="firstname"
                  id="firstname"
                  required
                />
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  id="surname"
                  required
                />
              </div>
              <div className="flex items-center checkout-input p-0">
                <img
                  src={EnvelopeIcon}
                  className="ml-[12px] w-[16px] h-[16px] pointer-events-none"
                />
                <input
                  className="flex-1 checkout-input border-0"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="flex gap-[24px]">
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  required
                />
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="Zip code"
                  name="zipCode"
                  id="zipCode"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col flex-1 justify-center">
          {!cart.length ? (
            <EmptyCart></EmptyCart>
          ) : (
            <>
              <Cart></Cart>
              <Button
                className="font-medium mt-[20px]"
                onClick={handlePayClick}
              >
                Pay
              </Button>
            </>
          )}
        </div>
      </section>

      {isSuccess && (
        <aside className="bg-white z-[999] absolute top-0 left-0 bottom-0 right-0">
          <Link to={"/products"} className="absolute right-[50px] top-[50px]">
            <img src={CloseIcon} alt="" />
          </Link>
          <div className="flex gap-[40px] flex-col h-full justify-center items-center text-center">
            <img src={SuccessIcon} alt="purchase successful" />
            <div>
              <h3 className="font-semibold text-[42px] mb-[16px]">Congrats!</h3>
              <p className="text-dark-blue text-[14px]">
                Your order is placed successfully!
              </p>
            </div>
            <Link
              to={"/products"}
              className="orange-btn font-medium w-full max-w-[214px] mt-[20px]"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      )}
    </section>
  );
}

export default Checkout;
