import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";

import { getProduct } from "../services/products";
import { addToCart } from "../services/cart";

import SoldOutBanner from "../elements/components/SoldOutBanner";
import Button from "../elements/components/Button";
import Spinner from "../elements/components/Spinner";

function ProductDetails() {
  const { user, isAuthorised } = useContext(AppContext);
  const colorMap = {
    White: "#FFFFFF",
    Red: "#FF0000",
    Multi: "linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #0000ff)",
    Blue: "#0000FF",
    "Navy Blue": "#001F54",
    Grey: "#808080",
    Black: "#000000",
    Purple: "#800080",
    Orange: "#FFA500",
    Beige: "#F5F5DC",
    Pink: "#FFC0CB",
    Green: "#008000",
    Cream: "#FFFDD0",
    Maroon: "#800000",
    Brown: "#A52A2A",
    Peach: "#FFE5B4",
    "Off White": "#F8F8F0",
    Mauve: "#E0B0FF",
    Yellow: "#FFFF00",
    Magenta: "#FF00FF",
    Khaki: "#F0E68C",
    Olive: "#808000",
  };

  const qClient = useQueryClient();
  const { id: productId } = useParams();

  const { data, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const [selectedColor, setSelectedColor] = useState(data?.color);
  const [selectedSize, setSelectedSize] = useState(data?.size);
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPhoto] = useState(null);

  const {
    mutate: addToCartMutation,
    // isPending: isBeingAdded,
    // isSuccess: isAddedSuccesfuly,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    addToCartMutation({
      product: productId,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  }

  useEffect(() => {
    if (data) {
      setSelectedColor(data.color === "Default" ? null : data?.color);
      setSelectedSize(data.size);
      setMainPhoto(data.cover_image);
    }
  }, [data]);

  if (productLoading) return <Spinner></Spinner>;

  return (
    <section className="mt-[30px]">
      <aside className="flex text-[14px] font-light">
        <Link to={"/products"}>Listing</Link>
        <p>/</p>
        <Link to={"#"}>Product</Link>
      </aside>

      <section className="flex gap-11 mt-[50px]">
        <div className="flex gap-[24px]">
          <div className="flex gap-[9px] flex-col">
            {data.images.map((img, i) => (
              <img
                key={i}
                className="max-w-[121px] cursor-pointer rounded-[6px] border-1 border-light-gray"
                style={{
                  borderColor: img === mainPhoto && "rgba(255, 64, 0, 1)",
                }}
                src={img}
                onClick={() => setMainPhoto(img)}
                alt={data.name}
              ></img>
            ))}
          </div>

          <div>
            <img
              className="max-w-[700px]"
              src={mainPhoto ?? data.cover_image}
              alt={data.name}
            />
          </div>
        </div>

        <article className="flex flex-col gap-[56px] overflow-hidden">
          <div className="flex flex-col gap-[21px]">
            <h1 className="text-main-black text-[32px] font-semibold">
              {data.name}
            </h1>
            <p className="text-main-black text-[32px] font-semibold">
              ${data.price}
            </p>
          </div>

          {!data.quantity ? (
            <SoldOutBanner></SoldOutBanner>
          ) : (
            <form className="flex flex-col gap-[48px]" onSubmit={handleSubmit}>
              <div>
                <p className="mb-[16px]">
                  {selectedColor === "Default" || !selectedColor
                    ? "Choose a color"
                    : `Color: ${selectedColor}`}
                </p>
                <ul className="flex items-center gap-[23px] pl-[6px] ">
                  {data.available_colors.map((color) => (
                    <li
                      key={color}
                      style={{
                        background: colorMap[color],

                        outline:
                          selectedColor === color && "1px solid lightgray",
                        outlineOffset: selectedColor === color && "5px",
                        outlineColor: selectedColor === color && "lightgray",
                      }}
                      className="h-[38px] w-[38px] rounded-full  border border-light-gray cursor-pointer"
                      onClick={() => setSelectedColor(color)}
                    ></li>
                  ))}
                </ul>
              </div>

              {(selectedSize || data.size) && (
                <div>
                  <p className="mb-[16px]">Size: {selectedSize ?? data.size}</p>
                  {data.available_sizes && (
                    <ul className="flex gap-[8px] ">
                      {data.available_sizes.map((size) => (
                        <li
                          className="border border-light-gray rounded-[10px] py-[9px] px-[25px] cursor-pointer"
                          style={{
                            backgroundColor:
                              selectedSize === size && "rgba(248, 246, 247, 1)",
                            border: selectedSize === size && "1px solid black",
                          }}
                          key={size}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div>
                {!data.quantity && <p>SOLD OUT</p>}
                {data.quantity && (
                  <>
                    <p className="mb-[16px]">Quantity:</p>
                    <select
                      className="border border-light-gray rounded-[10px] py-[9px] px-[16px]"
                      name="quantity"
                      id="quantity"
                      onChange={(e) => setQuantity(+e.target.value)}
                    >
                      {Array.from({
                        length: data.quantity <= 10 ? data.quantity : 10,
                      }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <Button
                disableCondition={!isAuthorised || !data.quantity}
                type="submit"
                className="cursor-pointer bg-main-red flex justify-center items-center gap-[10px] p-[16px] rounded-[10px]"
              >
                <>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 3.5H3.63568C4.14537 3.5 4.59138 3.84265 4.7227 4.33513L5.1059 5.77209M7.5 14.75C5.84315 14.75 4.5 16.0931 4.5 17.75H20.25M7.5 14.75H18.7183C19.8394 12.4494 20.8177 10.0664 21.6417 7.6125C16.88 6.39646 11.8905 5.75 6.75 5.75C6.20021 5.75 5.65214 5.7574 5.1059 5.77209M7.5 14.75L5.1059 5.77209M6 20.75C6 21.1642 5.66421 21.5 5.25 21.5C4.83579 21.5 4.5 21.1642 4.5 20.75C4.5 20.3358 4.83579 20 5.25 20C5.66421 20 6 20.3358 6 20.75ZM18.75 20.75C18.75 21.1642 18.4142 21.5 18 21.5C17.5858 21.5 17.25 21.1642 17.25 20.75C17.25 20.3358 17.5858 20 18 20C18.4142 20 18.75 20.3358 18.75 20.75Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text-white">
                    {!isAuthorised
                      ? "You need to log in for purchases"
                      : "Add to cart"}
                  </span>
                </>
              </Button>
            </form>
          )}

          <div className="h-[1px] bg-light-gray"></div>

          <aside>
            <div className="flex items-center justify-between max-h-[60px]">
              <h3 className="text-[20px] font-medium">Details</h3>
              <img
                className="max-w-[80px]"
                src={data.brand.image}
                alt={data.brand.name}
              />
            </div>
            <p className="mb-[20px]">Brand: {data.brand.name}</p>

            <p>{data.description}</p>
          </aside>
        </article>
      </section>
    </section>
  );
}

export default ProductDetails;
