import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppContext } from "../../context/AppContext";

import { removeFromCart, updateCartItem } from "../../services/cart";

function Cart() {
  const { cart, user } = useContext(AppContext);
  const totalPrice = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);
  const qClient = useQueryClient();

  const { mutate: removeMutate, isPending: removePending } = useMutation({
    mutationFn: removeFromCart,
    onSettled: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: updateCartItem,
    onSettled: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  return (
    <>
      <ul className="flex-1 max-h-[500px] overflow-y-scroll ">
        {cart.map((el) => (
          <li
            key={`${el.id}_${el.size}_${el.color}`}
            className="flex gap-[17px] mb-4"
          >
            <img
              className="w-[100px] h-[134px]"
              src={el.cover_image}
              alt={el.name}
            />
            <div className="flex flex-col flex-1 gap-[8px]">
              <div className="flex justify-between">
                <h4 className="text-[14px] font-medium">{el.name}</h4>
                <p className="text-[18px]">$ {el.price * el.quantity}</p>
              </div>
              <p className="text-dark-blue">{el.color}</p>
              <p>{el.size}</p>
              <div className="flex justify-between">
                <div className=" flex justify-around items-center gap-[9px] border border-light-gray rounded-[22px] px-[11px] py-[6px]">
                  <button
                    className="cursor-pointer px-1"
                    style={{ cursor: updatePending && "progress" }}
                    onClick={() => {
                      updateMutate({
                        item: el,
                        quantity: el.quantity - 1,
                      });
                    }}
                    disabled={el.quantity <= 1}
                  >
                    -
                  </button>
                  <p>{el.quantity}</p>
                  <button
                    className="cursor-pointer px-1"
                    style={{ cursor: updatePending && "progress" }}
                    onClick={() => {
                      updateMutate({
                        item: el,
                        quantity: el.quantity + 1,
                      });
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="cursor-pointer font-normal text-dark-blue"
                  style={{ cursor: removePending && "progress" }}
                  onClick={() => removeMutate(el)}
                >
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
    </>
  );
}

export default Cart;
