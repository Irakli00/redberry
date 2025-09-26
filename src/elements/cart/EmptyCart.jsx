import { useContext } from "react";
import EmptyCartIcon from "../../assets/icons/empty-cart.svg";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router";

function EmptyCart() {
  const { setCartModalOpen } = useContext(AppContext);

  return (
    <article className="flex flex-col justify-center items-center  text-center">
      <img src={EmptyCartIcon} alt="empty cart" className="max-w-[170px]" />
      <div>
        <h3 className="font-semibold text-[24px] text-main-black mb-[10px]">
          Ooops!
        </h3>
        <p className="text-dark-blue text-[14px] font-normal">
          You've got nothin in your cart just yet...
        </p>
      </div>

      <Link
        to={"/products/"}
        onClick={() => setCartModalOpen(false)}
        className="bg-main-red p-[10px] rounded-[10px] text-white w-[214px] mt-[60px]"
      >
        Start shopping
      </Link>
    </article>
  );
}

export default EmptyCart;
