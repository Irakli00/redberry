import { useContext, useRef } from "react";

import { AppContext } from "../context/AppContext";
import Cart from "../elements/cart/Cart";
import EnvelopeIcon from "../assets/icons/envelope.svg";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "../services/cart";

function Checkout() {
  const { user } = useContext(AppContext);
  const formRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      console.log("we good", data);
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
              <div className="relative">
                <input
                  className="bg-white w-full py-[10.5px] px-[12px] text-[14px] text-dark-blue border border-[#E1DFE1] rounded-[8px]  pl-[36px]"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                  // value={user.email}
                />
                <img
                  src={EnvelopeIcon}
                  className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] pointer-events-none"
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
          <button
            className="cursor-pointer bg-main-red flex justify-center items-center gap-[10px] text-white font-medium p-[16px] rounded-[10px] w-full mt-[20px]"
            onClick={handlePayClick}
          >
            Pay
          </button>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
