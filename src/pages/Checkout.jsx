import { useContext, useRef } from "react";

import { AppContext } from "../context/AppContext";
import Cart from "../elements/cart/Cart";

import EnvelopeIcon from "../assets/icons/envelope.svg";
import SuccessIcon from "../assets/icons/success.svg";
import CloseIcon from "../assets/icons/close.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../services/cart";
import { Link } from "react-router";
import Button from "../elements/components/Button";

function Checkout() {
  const { user } = useContext(AppContext);
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
    <main className="m-auto max-w-[1720px] mt-[72px]">
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
                  className="bg-white w-full py-[10.5px] px-[12px] text-[14px] text-dark-blue border border-[#E1DFE1] rounded-[8px]"
                  type="text"
                  placeholder="Name"
                  name="firstname"
                  id="firstname"
                  required
                />
                <input
                  className="bg-white w-full py-[10.5px] px-[12px] text-[14px] text-dark-blue border border-[#E1DFE1] rounded-[8px]"
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  id="surname"
                  required
                />
              </div>
              <div className="flex items-center bg-white border border-[#E1DFE1] rounded-[8px]">
                <img
                  src={EnvelopeIcon}
                  className="ml-[12px] w-[16px] h-[16px] pointer-events-none"
                />
                <input
                  className="flex-1 py-[10.5px] px-[12px] text-[14px] text-dark-blue "
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="flex gap-[24px]">
                <input
                  className="bg-white w-full py-[10.5px] px-[12px] text-[14px] text-dark-blue border border-[#E1DFE1] rounded-[8px]"
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  required
                />
                <input
                  className="bg-white w-full py-[10.5px] px-[12px] text-[14px] text-dark-blue border border-[#E1DFE1] rounded-[8px]"
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
        <div className="flex flex-col flex-1">
          <Cart></Cart>

          <Button className="font-medium mt-[20px]" onClick={handlePayClick}>
            Pay
          </Button>
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
    </main>
  );
}

export default Checkout;
