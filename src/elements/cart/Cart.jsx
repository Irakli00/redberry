import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { removeFromCart, updateCartItem } from "../../services/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Cart() {
  const { cart, user } = useContext(AppContext);
  const qClient = useQueryClient();

  const cartMap = {};
  cart.forEach((el) => (cartMap[el.id] = el.quantity));
  const [quantities, setQuantities] = useState(cartMap);

  const totalPrice = cart
    .map((el) => {
      return { price: el.price, quantity: el.quantity };
    })
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const { mutate: removeMutate } = useMutation({
    mutationFn: removeFromCart,
    onSettled: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateCartItem,
    onSettled: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  return (
    <>
      <ul className="flex-1 max-h-[500px] overflow-y-scroll ">
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
                <p className="text-[18px]">$ {el.price * el.quantity}</p>
              </div>
              <p className="text-dark-blue">{el.color}</p>
              <p>{el.size}</p>
              <div className="flex justify-between">
                <div className=" flex justify-around items-center gap-[9px] border border-light-gray rounded-[22px] px-[11px] py-[6px]">
                  <button
                    className="cursor-pointer px-1"
                    onClick={() => {
                      console.log(quantities, quantities[el.id], el.quantity);
                      updateMutate({
                        item: el,
                        quantity: quantities[el.id] ?? el.quantity,
                      });
                      setQuantities((p) => {
                        return { ...p, [el.id]: (p[el.id] ?? el.quantity) - 1 };
                      });
                    }}
                    disabled={(quantities[el.id] ?? el.quantity) <= 1}
                  >
                    -
                  </button>
                  <p>{quantities[el.id] ?? el.quantity}</p>
                  <button
                    className="cursor-pointer px-1"
                    onClick={() => {
                      console.log(quantities, quantities[el.id], el.quantity);
                      updateMutate({
                        item: el,
                        quantity: quantities[el.id] ?? el.quantity,
                      });
                      setQuantities((p) => {
                        return { ...p, [el.id]: (p[el.id] ?? el.quantity) + 1 };
                      });
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cursor-pointer font-normal text-dark-blue"
                  onClick={() => removeMutate(el.id)}
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
